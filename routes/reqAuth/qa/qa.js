var express=require('express')
var router=express.Router();
var reqUserType = require('../../../controllers/loggedin').reqUserType
router.use(reqUserType('qa'));
router.use(require('./review'));

module.exports=router;
