var express = require('express');
var router = express.Router();
var Order = require('../../models/orders.js').order
var postmaster = require('postmaster-shipping')({
	apiKey: 'tt_MTUyNDEwMDE6dGZ1aUh5Vl84aEwtLW4zdW5BNmlucWpkZEZR',
	password: 'SteelSeries88'
},true);
	
/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

var checkShippedOrders= setInterval(function(){
	Order.find({orderStatus:4},function(err,orders){
		if(err){
			console.log(err);
		} else {
			for(var i=0;i<orders.length;i++){
				postmaster.v1.track.byReferenceNo({
					tracking: orders[i].tNum
				}, function(err, response) {
					if ((response.status)&&response.status=="Delivered"){
						Order.findAndUpdate({orderID:orders[i].orderID},{orderStatus:5},function(err,orders){
							if(err){
								console.log(err);
							} else {
								console.log('order with orderID: '+orders[i].orderID+' has been updated to status 5, shipped');
							}
						});
					} else {
						console.log('no new deliveries... checking later...');
					};
				});
			};
		}
	});
},1000*60*30);

var testCheckShippedOrders= setInterval(function(){
	Order.find({orderStatus:4},function(err,orders){
		if(err){
			console.log(err)
		} else {
			for(var i=0;i<orders.length;i++){
				if(orders[i].tNum=="Delivered"){
					Order.update({orderID:orders[i].orderID},{ $set: {orderStatus:5}},function(err, order){
						if(err){
							console.log(err);
						} else {
							console.log('order status updated (test checker)');
						}
					})
				} else {
					console.log('order not shipped yet...(test checker)');
				}
			}
		}
	})
},1000*60*60);
		
module.exports = router;
