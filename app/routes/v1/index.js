var express = require('express');
var router = express.Router();

router.use('/preview', require('./preview.js'));
router.use('/save', require('./save.js'));

// routerにルーティングの動作を書いてく
// router.get('/',function(req,res){
//     res.json({
//         message:"Hello,world"
//     });
// });

//routerをモジュールとして扱う準備
module.exports = router;
