express=require('express');
router=express.Router();
Order=require('../../../models/orders.js').order

router.get('/printorders',function(req,res){
	Order.find({orderStatus:3},function(err,orders){
		if(err){
			console.error(err);
			res.send(err);
		} else {
			res.render('printorders',{orders:orders});
		}
	});
});
router.post('/printorders',function(req,res){
	Order.findOneAndUpdate({orderID:req.body.orderID},{orderStatus:4},function(err,order){
		if(err){
			console.error(err);
			res.send(err);
		} else {
			res.redirect('http://api.postmaster.io'+req.body.sLabel);
			Order.find({orderStatus:3},function(err,orders){
				if(err){
					console.error(err);
					res.send(err);
				} else {
					res.render('printorders',{orders:orders});
				}
			});
		}
	});
});

module.exports=router;
