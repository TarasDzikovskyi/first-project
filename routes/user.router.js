const router = require('express').Router();

const { userController, cartController, alcoController } = require('../controllers');

// const { userMiddleware } = require('../middlewares');

router.get('/', userController.getAllUsers);

router.get('/:user_id', userController.getUserById);

router.post('/', userController.createUser);

router.post('/cart', cartController.addToCart);
router.delete('/cart/remove/:user_id/:pub_id', cartController.removeFromCart);

router.post('/offer/:user_id', alcoController.addToOffer);
router.delete('/offer/remove/:user_id/:item_id', alcoController.removeFromOffer);

// router.post('/cart', cartController.addItemToCart)

router.patch('/:user_id', userController.updateUser);

router.delete('/:user_id', userController.deleteUser);

module.exports = router;
