const {pubController} = require("../controllers");
const {fileMiddleware} = require("../middlewares");
const router = require('express').Router();

router.get('/', pubController.getAllPubs)

router.post('/',
    fileMiddleware.checkAvatar,
    pubController.createPub)

module.exports = router;
