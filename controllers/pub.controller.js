const {passwordService, s3Service, emailService} = require("../services");
const {Pub, User} = require("../database");
const {USERS, PUBS} = require("../config/constants");
const {emailActionEnum} = require("../config");
const {userUtil} = require("../utils");
const {allow} = require("joi");

module.exports = {
    getAllPubs: async (req, res, next) => {
        try {
            const {page} = req.query;

            const limit = 3
            const startIndex = (Number(page) - 1) * limit
            const total = await Pub.countDocuments({})

            // const pubs = await Pub.find().lean()

            const pubs = await Pub.find().sort({_id: -1}).limit(limit).skip(startIndex).lean();
            return res.json({
                data: pubs,
                currentPage: Number(page),
                numberOfPages: Math.ceil(total/limit)
            });

            // return res.json(pubs)
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
                pub,
                body: {name},
                params: {pub_id}
            } = req;

            await Pub.findByIdAndUpdate(
                {_id: pub_id},
                {name},
                {new: true}
            );

            if (req.files && req.files.avatar) {
                if (pub.avatar) {
                    await s3Service.deleteFile(pub.avatar)
                }

                const s3Response = await s3Service.uploadFile(req.files.avatar, PUBS, pub_id)
                await Pub.findByIdAndUpdate(
                    pub_id,
                    {avatar: s3Response.Location},
                    {new: true}
                )
            }

            res.status(201).json('Pub is updated')
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

    likePub: async (req, res, next) => {
        try {
            const {pub_id} = req.params;

            const pub = await Pub.findById(pub_id)

            const updatedPub = await Pub.findByIdAndUpdate(pub_id, {likeCount: pub.likeCount + 1}, {new: true})

            res.json(updatedPub)
        } catch (e) {
            next(e);
        }
    }

}
