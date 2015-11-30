express=require('express');
router=express.Router();
Order=require('../../../models/orders.js').order;
var postmaster = require('postmaster-shipping')({
	apiKey: 'tt_MTUyNDEwMDE6dGZ1aUh5Vl84aEwtLW4zdW5BNmlucWpkZEZR',
	password: 'SteelSeries88'
},true);


router.get('/shipping',function(req,res){
	Order.find({orderStatus:2},function(err,orders){
		if(err){
			console.error(err);
			res.send(err);
		} else {
			res.render('shipping',{orders:orders});
		}
	});
});
router.post('/shipping',function(req,res){
	postmaster.v1.shipment.create({
		to: {
			company: 'personal',
			contact: req.body.cFname+' '+req.body.cLname,
			line1: req.body.StoAddr,
			city: req.body.StoCity,
			state: req.body.StoState,
			zip_code: req.body.StoZip,
			phone_no: req.body.cPhone
		},
		carrier: 'ups',
		service: '2DAY',
		package: {
			weight: 1.5,
			length: 10,
			width: 6,
			height: 8
		}
	}, function(err, response) {
		if (err){
			res.send(err);
		} else {
			Order.findOneAndUpdate({orderID:req.body.orderID},{orderStatus:3,tNum:response.tracking[0],sLabel:response.packages[0].label_url,postID:response.id},function(err,order){
				if(err){
					console.error(err);
					res.send(err);
				} else {
					res.send('shipping label has been created at '+'api.postmaster.io'+response.packages[0].label_url+' and order status has been updated to 3');
					console.log(response);
				}
			});
		};
	});
});

module.exports=router;
