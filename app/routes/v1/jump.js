/**
 * EXPRESS
 */
let express = require('express');
let router = express.Router();
let fs = require('fs');

/**
 * LINE
 */
const Line = require('./line/line');
const MyLine = new Line();
const TOKEN = '**';

/**
 * Nightmare
 */
const Nightmare = require('nightmare');
const nightmare = Nightmare({ show: false });
const user = '**';
const pass = '**';
let data = require('./data.json');
let LESSON_DAY = Number(data["day"]) + 1;
let LESSON_NUM = data["lesson"];

// ---------------------------------------------------------------------------

// GET  http://localhost:3000/api/v1/jump
router.get('/', function (req, res) {

    // LINE Notify トークンセット
    MyLine.setToken(TOKEN);
    // メッセージ送信
    MyLine.notify('AWS EXPRESS テスト');

    nightmare

        // ログインまでの処理
        .goto('https://www.jumpone.jp/jumpone_reserve/mypage.php')
        .type('input[name="login_id"]', user)
        .type('input[name="login_pass"]', pass)
        .click('input[src="img/top_login_off.gif"]')
        .wait(1000)
        .click('a[href="reserve.php"]')

        /**
         * 店舗選択
         * 第二引数にoptionのvalue値を設定する
         */
        .select('select[name="tenpo"]', data["tenpo"]) //銀座
        .wait(1000)

        // レッスン選択
        .click('#schedule div:nth-of-type(' + LESSON_DAY + ') a[href="javascript:void(0)"]:nth-of-type(' + LESSON_NUM + ') div:nth-of-type(' + 1 + ')')

        // set -> 非アクティブ
        // thickbox -> アクティブ
        // myset ->自分の予約しているトランポリン
        // thickboxの数を数える
        .evaluate(function() {
            let allTrampoline = document.querySelectorAll('div.seat_map div.number').length;
            let inactiveTrampoline = document.querySelectorAll('div.seat_map div.number a[href="javascript:void(0)"].set').length;
            let myTrampoline = document.querySelectorAll('div.seat_map div.number a[href="javascript:void(0)"].myset').length;
            let activeTrampoline = allTrampoline - ( inactiveTrampoline + myTrampoline );
            return activeTrampoline;
        })
        .end()
        .then(function(result) {
            let before = data["before"];
            let now = result;

            if (before < now) {
                console.log('空きが出た');
                MyLine.notify('空きが出た');
            } else if (before === now) {
                console.log('変わらない');
            } else if (before > now) {
                console.log('空きが減った');
            }
            // 空きトランポリン数を更新
            data["before"] = now;
            fs.writeFile('./routes/v1/data.json', JSON.stringify(data, null, '    '), (err) => {
                if (err) {
                    console.log('トランポリン数更新に失敗しました : ' + err);
                } else {
                    console.log('トランポリン数更新に成功しました');
                    res.json({message: "トランポリン数更新に成功しました"});
                }
            });
        })
});

//routerをモジュールとして扱う準備
module.exports = router;

