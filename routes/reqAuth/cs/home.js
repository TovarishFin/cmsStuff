var express = require('express');
var router = express.Router();
var Order = require('../../../models/orders').order

router.get('/home',function(req,res){
	Order.find({orderStatus:{$nin:4}},function(err,orders){
		if(err){
			res.send(err)
		} else {
			res.render('csHome',{orders:orders})
		};
	});
	
});

module.exports=router;
