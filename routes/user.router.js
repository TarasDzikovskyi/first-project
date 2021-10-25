const router = require('express').Router();

const { userController } = require('../controllers');

const { userMiddleware } = require('../middlewares');

// router.post('/', userController);

module.exports = router;
