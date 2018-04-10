// ライブラリ読み込み
var express    = require('express');
var app        = express();
var bodyParser = require('body-parser');

//body-parserの設定
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

// 静的ファイルの設定（publicディレクトリに/staticとしてアクセス）
app.use('/', express.static(__dirname + '/public'));

// port番号を指定
var port = process.env.PORT || 3000;

var router = require('./routes/v1/');
app.use('/api/v1/', router);

//サーバ起動
app.listen(port);
console.log('listen on port ' + port);
