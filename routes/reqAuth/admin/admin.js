var express=require('express')
var router=express.Router();
var reqUserType = require('../../../controllers/loggedin').reqUserType
router.use(reqUserType('admin'));
router.use(require('./add'));

module.exports=router;
