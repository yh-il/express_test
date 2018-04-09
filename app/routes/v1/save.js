var express = require('express');
var router = express.Router();
var fs = require('fs');
var data = require('./data.json');

// GET  http://localhost:3000/api/v1/save
router.get('/', function (req, res) {

    // パラメータ取得
    // http://localhost:3000/api/v1/save?before=0&tenpo=4&day=1&lesson=1
    data["before"] = req.query['before'] ? req.query['before'] : 0;
    data["tenpo"] = req.query['tenpo'] ? req.query['tenpo'] : 4;
    data["day"] = req.query['day'] ? req.query['day'] : 1;
    data["lesson"] = req.query['lesson'] ? req.query['lesson'] : 1;

    // ファイル書き込み
    fs.writeFile('./routes/v1/data.json', JSON.stringify(data, null, '    '), (err) => {
        if (err) {
            console.log('ファイル書き込みでエラーが発生しました ： ' + err);
            throw err;
        }  else {
            console.log('ファイル書き込みが成功しました');
            res.json(data);
        }
    });

});

//routerをモジュールとして扱う準備
module.exports = router;
