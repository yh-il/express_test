var express = require('express');
var router = express.Router();
var fs = require('fs');
var data = require('./data.json');

// GET  http://localhost:3000/api/v1/preview
router.get('/', function (req, res) {
    res.json(data);
});

//routerをモジュールとして扱う準備
module.exports = router;
