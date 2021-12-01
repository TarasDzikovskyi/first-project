const {pubController} = require("../controllers");
const {fileMiddleware, pubMiddleware} = require("../middlewares");
const router = require('express').Router();

// router.get('/', pubController.getAllPubs)
router.get('/', pubController.getAllSortedPubs)
// router.get('/search', pubController.getPubsBySearch)
router.get('/search', pubController.getAllSortedPubs)
router.get('/:pub_id', pubController.getPubById)

router.post('/',
    fileMiddleware.checkAvatar,
    pubController.createPub)

router.patch('/:pub_id', pubController.updatePub)
router.post('/:pub_id/newsPub', pubController.newsPub)

router.delete('/:pub_id',
    pubMiddleware.getPubByDynamicParam('pub_id', 'params', '_id'),
    pubMiddleware.isPubNotPresent,
    pubController.deletePub)

router.get('/reviews/:pub_id', pubController.getReviews)
router.post('/reviews', pubController.createReview)
router.delete('/reviews/:pub_id/:review_id', pubController.deleteReview)

router.get('/news/:pub_id', pubController.getNews)
router.post('/news/:pub_id/:user_id', pubController.createNews)
router.delete('/news/:pub_id/:news_id', pubController.deleteNews)

module.exports = router;
