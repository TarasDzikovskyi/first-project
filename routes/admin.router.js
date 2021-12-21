const router = require('express').Router();

const { adminController, userController, pubController } = require('../controllers');
// const { pubMiddleware } = require('../middlewares');

// const { userMiddleware } = require('../middlewares');

router.get('/pubs', pubController.getAllPubs);
router.get('/pubs/all', adminController.getAllPubs);
router.get('/users', adminController.getUsersByAdmin);

router.get('/pubs/filter', adminController.getNotActivatedPubs);

router.patch('/activate/:pub_id', pubController.pubActivated);

router.get('/users/search', userController.getUsersBySearch);
router.get('/pubs/search', adminController.getPubsByOnlySearch);
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
