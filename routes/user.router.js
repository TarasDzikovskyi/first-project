const router = require('express').Router();

const { userController } = require('../controllers');

const { userMiddleware } = require('../middlewares');

// router.post('/signup', userController.createUser);

module.exports = router;
