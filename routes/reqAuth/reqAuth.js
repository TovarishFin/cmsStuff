var express=require('express')
var router=express.Router();
var reqUserType = require('../../controllers/loggedin').reqUserType

router.use(require('./index'));
router.use('/admin', require('./admin/admin'));
router.use('/cs', require('./cs/cs'));
router.use('/qa', require('./qa/qa'));
router.use('/wh', require('./wh/wh'));

module.exports=router;
