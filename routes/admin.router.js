const router = require('express').Router();

const { adminController, userController} = require('../controllers');

// const { userMiddleware } = require('../middlewares');


router.get('/', adminController.getPubsByAdmin)

router.get('/users', adminController.getUsersByAdmin)
//
// router.post('/',
//     // userMiddleware.validateUserBody,
//     userController.createUser)
//
// router.patch('/:user_id',
//     // userMiddleware.validateUpdatedUser,
//     userController.updateUser)
//
// router.delete('/:user_id', userController.deleteUser)

module.exports = router;
