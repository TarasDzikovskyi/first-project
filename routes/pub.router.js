const {pubController} = require("../controllers");
const {fileMiddleware, pubMiddleware} = require("../middlewares");
const router = require('express').Router();

router.get('/', pubController.getAllPubs)
router.get('/search', pubController.getPubsBySearch)
router.get('/:pub_id', pubController.getPubById)

router.post('/',
    fileMiddleware.checkAvatar,
    pubController.createPub)

router.patch('/:pub_id', pubController.updatePub)
router.patch('/:pub_id/likePub', pubController.likePub)
router.post('/:pub_id/commentPub', pubController.commentPub)

router.delete('/:pub_id',
    pubMiddleware.getPubByDynamicParam('pub_id', 'params', '_id'),
    pubMiddleware.isPubNotPresent,
    pubController.deletePub)

module.exports = router;
