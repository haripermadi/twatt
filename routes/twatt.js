var express = require('express');
var router = express.Router();
const {timeline,createTweet,searchTweet} = require('../controllers/twatt')


router.get('/',timeline);
router.post('/',createTweet)
router.get('/search',searchTweet)

module.exports = router;
