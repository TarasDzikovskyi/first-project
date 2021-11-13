const router = require('express').Router();

const { userController } = require('../controllers');

const { userMiddleware } = require('../middlewares');


router.patch('/:user_id', userController.updateUser)

module.exports = router;
