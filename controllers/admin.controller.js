const {Pub, User} = require("../database");
module.exports = {
    getPubsByAdmin: async (req, res, next) => {
        try {
            const {page} = req.query;
            const limit = 10
            const startIndex = (Number(page) - 1) * limit
            const total = await Pub.countDocuments({})

            const pubs = await Pub.find().sort({_id: -1}).limit(limit).skip(startIndex).lean();
            // const pubs = await Pub.find().lean();
            return res.status(200).json({
                data: pubs,
                currentOfPubPage: Number(page),
                numberOfPubPages: Math.ceil(total/limit)
            });

            // return res.status(200).json(pubs)
        } catch (e) {
            next(e);
        }
    },

    getAllPubs: async (req, res, next) => {
        try {
            const pubs = await Pub.find().lean();
            console.log(pubs)

            return res.status(200).json(pubs)
        } catch (e) {
            next(e);
        }
    },

    getNotActivatedPubs: async (req, res, next) => {
        try {
            const pubs = await Pub.find().lean();

           const filteredPubs= pubs.filter((pub) => pub.isActivated === false)

            return res.status(200).json(filteredPubs)
        } catch (e) {
            next(e);
        }
    },

    getUsersByAdmin: async (req, res, next) => {
        try {
            const {page} = req.query;
            const limit = 11
            const startIndex = (Number(page) - 1) * limit
            const total = await User.countDocuments({})

            const users = await User.find().sort({_id: -1}).limit(limit).skip(startIndex).lean();
            return res.status(200).json({
                data: users,
                currentUserPage: Number(page),
                numberOfUserPages: Math.ceil(total/limit)
            });
        } catch (e) {
            next(e);
        }
    },

    getPubsByOnlySearch: async (req, res, next) => {
        try {
            const {searchQuery} = req.query

            const name = new RegExp(searchQuery, 'i');

            const pubs = await Pub.find({$or: [{name}]})

            res.json({data: pubs})
        } catch (e) {
            next(e)
        }
    },
}

