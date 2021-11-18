const router = require('express').Router();

const { userController } = require('../controllers');

const { userMiddleware } = require('../middlewares');

router.post('/', userController.createUser)

router.patch('/:user_id', userController.updateUser)

router.delete('/:user_id', userController.deleteUser)

module.exports = router;
