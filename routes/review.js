var express=require('express');
var router=express.Router();
var Order=require('../models/orders.js').order

router.get('/paidorders', function(req,res){
	Order.find({orderStatus:1},function(err,orders){
		res.render('paidorders',{orders:orders});
	});
});
router.post('/paidorders',function(req,res){
	Order.findOneAndUpdate({orderID:req.body.orderID},{orderStatus:2},function(err,order){
		if(err){
			console.error(err);
			res.send(error);
		} else {
			res.send('order was approved by qa and moved to status "2"');
		}
	});
});

module.exports=router;
