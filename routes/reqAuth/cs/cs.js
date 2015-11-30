var express=require('express')
var router=express.Router();
var reqUserType = require('../../../controllers/loggedin').reqUserType
router.use(reqUserType('cs'));
router.use(require('./addcustomer'));
router.use(require('./addorder'));
router.use(require('./payment'));
router.use(require('./shipping.js'));

module.exports=router;
