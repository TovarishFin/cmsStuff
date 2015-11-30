var express=require('express')
var router=express.Router();
var reqUserType = require('../controllers/loggedin').reqUserType

router.use(require('./index'));
router.use(reqUserType('cs'),require('./addorder'));
router.use(reqUserType('cs'),require('./addcustomer'));
router.use(reqUserType('cs'),require('./payment'));
router.use(reqUserType('qa'),require('./review'));
router.use(reqUserType('cs'),require('./shipping'));
router.use(reqUserType('wh'),require('./printorders.js'));
router.use(reqUserType('admin'),require('./add'));

module.exports=router;
