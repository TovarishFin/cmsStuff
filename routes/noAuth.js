var express=require('express'),
router=express.Router();
router.use(require('./login'));
router.use(require('./register'));
router.use(require('./logout'));

module.exports=router;
