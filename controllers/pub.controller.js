const {passwordService, s3Service, emailService} = require("../services");
const {Pub} = require("../database");
const {USERS} = require("../config/constants");
const {emailActionEnum} = require("../config");
const {userUtil} = require("../utils");

module.exports = {
    getAllPubs: async (req, res, next) => {
        try {
            const allPubs = await Pub.find().lean();

            return res.json(allPubs);
        } catch (e) {
            next(e);
        }
    },

    createPub: async (req, res, next) => {
        try {
            const { name, email } = req.body;

            let createdPub = await Pub.create({...req.body});
            // console.log(createdPub)
            console.log(req.files)

            console.log('---------------------1')
            if (req.files && req.files.avatar) {
                const s3Response = await s3Service.uploadFile(req.files.avatar, USERS, createdPub._id);
                console.log(s3Response)
                console.log('------------------------2')
                createdPub = await Pub.findByIdAndUpdate(
                    createdPub._id,
                    {avatar: s3Response.Location},
                    {new: true}
                );
            }

            await emailService.sendMail(
                'tarasdz123@gmail.com',
                emailActionEnum.CREATE,
                { userName: name }
            );

            const pubToReturn = userUtil.userNormalizator(createdPub.toObject());
            console.log('Body', req.body)
            res.status(201).json(pubToReturn);
        } catch (e) {
            next(e);
        }
    }
}
