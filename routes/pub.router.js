const {pubController} = require("../controllers");
const {fileMiddleware, pubMiddleware} = require("../middlewares");
const router = require('express').Router();

router.get('/', pubController.getAllPubs)
router.get('/search', pubController.getPubsBySearch)

router.post('/',
    fileMiddleware.checkAvatar,
    pubController.createPub)

router.patch('/:pub_id')
router.patch('/:pub_id/likePub', pubController.likePub)

router.delete('/:pub_id',
    pubMiddleware.getPubByDynamicParam('pub_id', 'params', '_id'),
    pubMiddleware.isPubNotPresent,
    pubController.deletePub)

module.exports = router;
