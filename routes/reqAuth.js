var express=require('express'),
router=express.Router();
router.use(require('./add'));
router.use(require('./addorder'));
router.use(require('./addcustomer'));
router.use(require('./payment'));
router.use(require('./review'));
router.use(require('./shipping'));
router.use(require('./printorders.js'));
router.use(require('./index'));

module.exports=router;
