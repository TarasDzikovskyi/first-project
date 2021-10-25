const { passwordService, s3Service, emailService} = require("../services");
const { User } = require("../database");
const {USERS} = require("../config/constants");
const {emailActionEnum} = require("../config");
const {userUtil} = require("../utils");

module.exports = {
    createUser: async (req, res, next) => {
        try {
            const { password, name, email } = req.body;
            const hashedPassword = await passwordService.hash(password);

            let createdUser = await User.create({ ...req.body, password: hashedPassword });

            if (req.files && req.files.avatar) {
                const s3Response = await s3Service.uploadFile(req.files.avatar, USERS, createdUser._id);
                createdUser = await User.findByIdAndUpdate(
                    createdUser._id,
                    {avatar: s3Response.Location},
                    {new: true}
                );
            }

            await emailService.sendMail(
                'tarasdz123@gmail.com',
                emailActionEnum.CREATE,
                { userName: name }
            );

            const userToReturn = userUtil.userNormalizator(createdUser.toObject());
            console.log('Body', req.body)
            res.status(201).json(userToReturn);
        } catch (e) {
            next(e);
        }
    },

    getUserById: async (req, res, next) => {
        try {
            const {user_id} = req.params;

            const returnUser = await User.findById(user_id).select('-password').lean();
            res.json(returnUser)



        } catch (e) {
            next(e);
        }
    },

    updateUser: async (req, res, next) => {
        try {
            const {
                user,
                body: {name, born_year, email},
                params: {user_id}
            } = req;

            await User.findByIdAndUpdate(
                {_id: user_id},
                {name, born_year, email},
                {new: true}
            );

            if (req.files && req.files.avatar) {
                if (user.avatar) {
                    await s3Service.deleteFile(user.avatar)
                }

                const s3Response = await s3Service.uploadFile(req.files.avatar, USERS, user_id)
                await User.findByIdAndUpdate(
                    user_id,
                    {avatar: s3Response.Location},
                    {new: true}
                )
            }

            await emailService.sendMail(
                email,
                emailActionEnum.UPDATE,
                {userName: req.user.name}
            )

            res.status(201).json('User is updated')
        } catch (e) {
            next(e)
        }
    },

    deleteUser: async (req, res, next) => {
        try {
            const {
                user,
                body: {email},
                params: {user_id}
            } = req;

            if (user.avatar) {
                await s3Service.deleteFile(user.avatar)
            }

            if (user.role.includes('admin')) {
                await emailService.sendMail(
                    email,
                    emailActionEnum.DELETE_BY_ADMIN,
                    {userName: req.user.name}
                )
            } else {
                await emailService.sendMail(
                    email,
                    emailActionEnum.DELETE_BY_USER,
                    {userName: req.user.name}
                )
            }

            await User.deleteOne({_id: user_id})

            res.sendStatus('deleted')
        } catch (e) {
            next(e);
        }
    }
}
