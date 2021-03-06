var express = require('express');
var router = express.Router();
var authController = require('../../../controllers/auth');
var Order = require('../../../models/orders').order;
var shortid = require('shortid');

router.post('/orders',authController.postAuthenticate,function(req,res){
	newOrderID=shortid.generate()
	var newOrder = new Order({
		itemName: req.body.itemName,
		pMethod: req.body.pMethod,
		itemPrice: req.body.itemPrice,
		orderStatus: req.body.orderStatus,
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
		orderID: newOrderID,
		user: req.user.username
	});
	newOrder.save(function(err,name){
		if(err){
			console.error(err);
			res.send(err);
		} else {
			console.log('order with customer info saved successfully... and order id is: '+newOrderID);
			res.json({
				message:'order added successfully',
				orderID: newOrderID 
				});
		}
	});
});

module.exports = router;
