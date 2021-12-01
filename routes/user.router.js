const router = require('express').Router();

const { userController, cartController } = require('../controllers');

// const { userMiddleware } = require('../middlewares');

router.get('/', userController.getAllUsers)

router.get('/:user_id', userController.getUserById)

router.post('/', userController.createUser)

router.post('/cart', cartController.addToCart)
router.delete('/cart/remove/:user_id/:pub_id', cartController.removeFromCart)

// router.post('/cart', cartController.addItemToCart)

router.patch('/:user_id', userController.updateUser)

router.delete('/:user_id', userController.deleteUser)

module.exports = router;
