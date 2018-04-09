/**
 * setting LINE
 */
const Axios = require('axios');
const QueryString = require('querystring');

const Line = function () {};

/**
 * LINE Notifyのトークンセット
 * @param {String} token LINE Notifyトークン
 */
Line.prototype.setToken = function(token) {
    this.token = token;
};

/**
 * LINE Notify実行
 * @param {String} text メッセージ
 */
Line.prototype.notify = function(text) {
    Axios(
        {
            method: 'post',
            url: 'https://notify-api.line.me/api/notify',
            headers: {
            Authorization: `Bearer ${this.token}`,
            'Content-Type': 'application/x-www-form-urlencoded',
            },
            data: QueryString.stringify({
            message: text,
            }),
        }
    )
    .then( function(res) {
      console.log(res.data);
    })
    .catch( function(err) {
      console.error(err);
    });
};

module.exports = Line;
