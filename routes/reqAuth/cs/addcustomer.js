var express=require('express');
router=express.Router();
var Customer = require('../../../models/customers.js').customer
var Order = require('../../../models/orders.js').order
var shortid = require('shortid');

router.get('/addcustomer',function(req,res){
	Customer.find({},function(err,customers){
	res.render('addcustomer',{customers:customers, orderPrice:req.session.order});
	});
	console.log(req.session.order);
});
router.post('/addcustomer',function(req,res){
	var newOrder = new Order({
		itemName: req.session.order.itemName,
		pMethod: req.session.order.pMethod,
		itemPrice: req.session.order.itemPrice,
		orderStatus: req.session.order.orderStatus,
		cFname: req.body.cFname,
		cLname: req.body.cLname,
		ccNumber: req.body.ccNumber,
		ccExpDate: req.body.ccExpDate,
		ccCode: req.body.ccCode,
		BtoAddr: req.body.BtoAddr,
		BtoCity: req.body.BtoCity,
		BtoState: req.body.BtoState,
		BtoZip:req.body.BtoZip,
		BtoCountry: req.body.BtoCountry,
		StoAddr:req.body.StoAddr,
		StoCity:req.body.StoCity,
		StoState:req.body.StoState,
		StoZip:req.body.StoZip,
		StoCountry:req.body.StoCountry,
		cPhone: req.body.cPhone,
		orderID: shortid.generate(),
		user: req.user.username
	});
	newOrder.save(function(err,name){
		if(err){
			console.error(err);
			res.send(err);
		} else {
			console.log('order with customer info saved successfully...');
		}
	});
	Customer.findOne({cFname:req.body.cFname, cLname: req.body.cLname},function(err,customerq){
		if(!customerq){
			var newCustomer = new Customer({
				cFname: req.body.cFname,
				cLname: req.body.cLname,
				ccNumber: req.body.ccNumber,
				ccExpDate: req.body.ccExpDate,
				ccCode: req.body.ccCode,
				BtoAddr: req.body.BtoAddr,
				BtoCity: req.body.BtoCity,
				BtoState: req.body.BtoState,
				BtoZip:req.body.BtoZip,
				BtoCountry: req.body.BtoCountry,
				StoAddr:req.body.StoAddr,
				StoCity:req.body.StoCity,
				StoState:req.body.StoState,
				StoZip:req.body.StoZip,
				StoCountry:req.body.StoCountry,
				cPhone: req.body.cPhone,
				customerID: shortid.generate()
			});
			newCustomer.save(function(err,name){
				if(err){
					console.error(err);
					res.send(err);
				} else {
					res.send('customer info/order saved');
				}
			});
		} else {
			res.send('order saved, customer info already existed');
		}
	});
});

module.exports=router;
