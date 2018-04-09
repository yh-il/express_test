var express = require('express');
var router = express.Router();

router.use('/preview', require('./preview.js'));
router.use('/save', require('./save.js'));
router.use('/jump', require('./jump.js'));

//routerをモジュールとして扱う準備
module.exports = router;
