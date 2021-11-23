const {s3Service} = require("../services");
const {Pub} = require("../database");
const {PUBS} = require("../config/constants");
const {userUtil} = require("../utils");

module.exports = {
    getAllPubs: async (req, res, next) => {
        try {
            const {page} = req.query;
            const limit = 6
            const startIndex = (Number(page) - 1) * limit
            const total = await Pub.countDocuments({})

            const pubs = await Pub.find().sort({_id: -1}).limit(limit).skip(startIndex).lean();
            // const pubs = await Pub.find().lean();
            return res.status(200).json({
                data: pubs,
                currentPage: Number(page),
                numberOfPages: Math.ceil(total / limit)
            });

            // return res.status(200).json(pubs)
        } catch (e) {
            next(e);
        }
    },

    getPubById: async (req, res, next) => {
        try {
            const {pub_id} = req.params;

            const returnPub = await Pub.findById(pub_id).lean();
            res.json(returnPub)
        } catch (e) {
            next(e);
        }
    },

    getPubsBySearch: async (req, res, next) => {
        try {
            const {searchQuery, tags} = req.query

            const name = new RegExp(searchQuery, 'i');

            const pubs = await Pub.find({$or: [{name}, {tags: {$in: tags.split(',')}}]})

            res.json({data: pubs})
        } catch (e) {
            next(e)
        }
    },

    createPub: async (req, res, next) => {
        try {
            let createdPub = await Pub.create({...req.body});

            if (req.files && req.files.avatar) {
                const s3Response = await s3Service.uploadFile(req.files.avatar, PUBS, createdPub._id);
                createdPub = await Pub.findByIdAndUpdate(
                    createdPub._id,
                    {avatar: s3Response.Location},
                    {new: true}
                );
            }

            const pubToReturn = userUtil.userNormalizator(createdPub.toObject());
            res.status(201).json(pubToReturn);
        } catch (e) {
            next(e);
        }
    },

    updatePub: async (req, res, next) => {
        try {
            const {
                body: {name, address, contact, tags, order, description, schedule},
                params: {pub_id}
            } = req;

            const avatarPub = await Pub.findById({_id: pub_id})

            const newPub = await Pub.findByIdAndUpdate(
                {_id: pub_id},
                {name, address, contact, tags, order, description, schedule},
                {new: true}
            );

            if (req.files && req.files.avatar) {
                if (avatarPub.avatar) {
                    await s3Service.deleteFile(avatarPub.avatar)
                }

                const s3Response = await s3Service.uploadFile(req.files.avatar, PUBS, pub_id)
                await Pub.findByIdAndUpdate(
                    pub_id,
                    {avatar: s3Response.Location},
                    {new: true}
                )
            }

            res.status(201).json(newPub)
        } catch (e) {
            next(e)
        }
    },

    deletePub: async (req, res, next) => {
        try {
            const {
                pub,
                params: {pub_id}
            } = req;

            if (pub.avatar) {
                await s3Service.deleteFile(pub.avatar)
            }

            await Pub.deleteOne({_id: pub_id})

            res.json('Deleted')
        } catch (e) {
            next(e);
        }
    },

    newsPub: async (req, res, next) => {
        try {
            const {pub_id} = req.params;
            const {value} = req.body;

            console.log(value)

            const pub = await Pub.findById(pub_id)
            pub.news.push(value)

            const updatedPub = await Pub.findByIdAndUpdate(pub_id, pub, {new: true})

            res.json(updatedPub)

        } catch (e) {
            next(e)
        }
    },

    pubActivated: async (req, res, next) => {
        try {
            const {pub_id} = req.params;

            const pub = await Pub.findById(pub_id)
            // pub.comments.push(value)
            pub.isActivated = true

            const updatedPub = await Pub.findByIdAndUpdate(pub_id, pub, {new: true})

            console.log(updatedPub)

            res.json(updatedPub)

        } catch (e) {
            next(e)
        }
    },

    createReview: async (req, res, next) => {
        try {
            const {rating, comment, pub_id, user_id, user_name} = req.body;

            const review = {
                user: user_id,
                name: user_name,
                rating: Number(rating),
                comment,
            };

            const pub = await Pub.findById(pub_id);

            const isReviewed = pub.reviews.find(
                (rev) => rev.user.toString() === user_id.toString()
            );

            if (isReviewed) {
                pub.reviews.forEach((rev) => {
                    if (rev.user.toString() === user_id.toString())
                        (rev.rating = rating), (rev.comment = comment);
                });
            } else {
                pub.reviews.push(review);
                pub.numOfReviews = pub.reviews.length;
            }

            let avg = 0;

            pub.reviews.forEach((rev) => {
                avg += rev.rating;
            });

            pub.ratings = avg / pub.reviews.length;

            await pub.save({validateBeforeSave: false});

            res.status(200).json({
                success: true,
            })
        } catch (e) {
            next(e)
        }
    },

    getReviews: async (req, res, next) => {
        try {
            const {pub_id} = req.params;

            const pub = await Pub.findById(pub_id);

            res.status(200).json({
                success: true,
                reviews: pub.reviews,
            });
        } catch (e) {
            next(e)
        }
    },

    deleteReview: async (req, res, next) => {
        try {
            const {pub_id, review_id} = req.params;

            const pub = await Pub.findById(pub_id);

            const reviews = pub.reviews.filter(
                (rev) => rev._id.toString() !== review_id.toString()
            );

            let avg = 0;

            reviews.forEach((rev) => {
                avg += rev.rating;
            });

            let ratings = 0;

            if (reviews.length === 0) {
                ratings = 0;
            } else {
                ratings = avg / reviews.length;
            }

            const numOfReviews = reviews.length;

            await Pub.findByIdAndUpdate(
                pub_id,
                {
                    reviews,
                    ratings,
                    numOfReviews,
                },
                {
                    new: true,
                    runValidators: true,
                    useFindAndModify: false,
                }
            );

            res.status(200).json({
                success: true,
            });
        } catch (e) {
            next(e)
        }
    },

    createNews: async (req, res, next) => {
        try {
            const {text, pub_id, user_id, user_name} = req.body;

            const singleNews = {
                user: user_id,
                name: user_name,
                text,
            };

            const pub = await Pub.findById(pub_id);

            const isNews = pub.news.find(
                (rev) => rev.user.toString() === user_id.toString()
            );

            if (isNews) {
                pub.news.forEach((rev) => {
                    if (rev.user.toString() === user_id.toString())
                        (rev.text = text);
                });
            } else {
                pub.news.push(singleNews);
                pub.numOfNews = pub.news.length;
            }

            // let avg = 0;

            // pub.news.forEach((rev) => {
            //     avg += rev.rating;
            // });

            // pub.ratings = avg / pub.reviews.length;

            await pub.save({validateBeforeSave: false});

            res.status(200).json({
                success: true,
            })
        } catch (e) {
            next(e)
        }
    },

    getNews: async (req, res, next) => {
        try {
            const {pub_id} = req.params;

            const pub = await Pub.findById(pub_id);

            res.status(200).json({
                success: true,
                news: pub.news,
            });
        } catch (e) {
            next(e)
        }
    },

    deleteNews: async (req, res, next) => {
        try {
            const {pub_id, news_id} = req.params;

            const pub = await Pub.findById(pub_id);

            const news = pub.news.filter(
                (rev) => rev._id.toString() !== news_id.toString()
            );

            await Pub.findByIdAndUpdate(
                pub_id,
                {
                    news,
                    numOfNews,
                },
                {
                    new: true,
                    runValidators: true,
                    useFindAndModify: false,
                }
            );

            res.status(200).json({
                success: true,
            });
        } catch (e) {
            next(e)
        }
    },

    createShares: async (req, res, next) => {
        try {
            const {text, pub_id, user_id, user_name} = req.body;

            const singleShares = {
                user: user_id,
                name: user_name,
                text,
            };

            const pub = await Pub.findById(pub_id);

            const isShares = pub.shares.find(
                (rev) => rev.user.toString() === user_id.toString()
            );

            if (isShares) {
                pub.shares.forEach((rev) => {
                    if (rev.user.toString() === user_id.toString())
                        (rev.text = text);
                });
            } else {
                pub.shares.push(singleShares);
                pub.numOfShares = pub.shares.length;
            }

            await pub.save({validateBeforeSave: false});

            res.status(200).json({
                success: true,
            })
        } catch (e) {
            next(e)
        }
    },

    getShares: async (req, res, next) => {
        try {
            const {pub_id} = req.params;

            const pub = await Pub.findById(pub_id);

            res.status(200).json({
                success: true,
                shares: pub.shares,
            });
        } catch (e) {
            next(e)
        }
    },

    deleteShares: async (req, res, next) => {
        try {
            const {pub_id, shares_id} = req.params;

            const pub = await Pub.findById(pub_id);

            const shares = pub.shares.filter(
                (rev) => rev._id.toString() !== shares_id.toString()
            );

            await Pub.findByIdAndUpdate(
                pub_id,
                {
                    shares,
                    numOfShares,
                },
                {
                    new: true,
                    runValidators: true,
                    useFindAndModify: false,
                }
            );

            res.status(200).json({
                success: true,
            });
        } catch (e) {
            next(e)
        }
    },

    getEvents: async (req, res, next) => {
        try {
            const {pub_id} = req.params;

            const pub = await Pub.findById(pub_id);

            res.status(200).json({
                success: true,
                events: pub.events,
            });
        } catch (e) {
            next(e)
        }
    },

    createEvents: async (req, res, next) => {
        try {
            const {text, pub_id, user_id, user_name} = req.body;

            const singleEvents = {
                user: user_id,
                name: user_name,
                text,
            };

            const pub = await Pub.findById(pub_id);

            const isShares = pub.events.find(
                (rev) => rev.user.toString() === user_id.toString()
            );

            if (isShares) {
                pub.events.forEach((rev) => {
                    if (rev.user.toString() === user_id.toString())
                        (rev.text = text);
                });
            } else {
                pub.shares.push(singleEvents);
                pub.numOfEvents = pub.events.length;
            }

            await pub.save({validateBeforeSave: false});

            res.status(200).json({
                success: true,
            })
        } catch (e) {
            next(e)
        }
    },

    deleteEvents: async (req, res, next) => {
        try {
            const {pub_id, events_id} = req.params;

            const pub = await Pub.findById(pub_id);

            const events = pub.events.filter(
                (rev) => rev._id.toString() !== events_id.toString()
            );

            await Pub.findByIdAndUpdate(
                pub_id,
                {
                    events,
                    numOfEvents,
                },
                {
                    new: true,
                    runValidators: true,
                    useFindAndModify: false,
                }
            );

            res.status(200).json({
                success: true,
            });
        } catch (e) {
            next(e)
        }
    },
}
