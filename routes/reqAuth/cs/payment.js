express=require('express');
router=express.Router();
var Order = require('../../../models/orders.js').order
var stripe = require('stripe')('sk_test_6ydpToQCedRDhc8SYyyLyDfM');
router.get('/runpayment', function(req,res){
	Order.find({orderStatus:0},function(err,orders){
		if(err){
			console.error(err);
			res.send(err);
		} else {
	res.render('runpayment',{orders:orders});
		}
	});						
});
router.post('/runpayment',function(req,res){
	var stripeToken=req.body.stripeToken;
	console.log(stripeToken);
	var charge=stripe.charges.create({
		amount:req.body.chargePrice*100,
		currency:'usd',
		source:stripeToken,
		description:'first test'
	},function(err,charge){
		if (err && err.type==='stripeCardError'){
			res.send('the card has been declined');
		} else {
			Order.findOneAndUpdate({orderID:req.body.orderID},{orderStatus:1},function(err,orders){
				if(err){
					res.send('order status didnt update properly');
				} else {
					res.send('order status updated');
				};
			});
				
		}
	});
});

module.exports=router;	
