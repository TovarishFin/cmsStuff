var express=require('express')
var router=express.Router();
var reqUserType = require('../../../controllers/loggedin').reqUserType
router.use(reqUserType('wh'));
router.use(require('./printorders'));

module.exports=router;
