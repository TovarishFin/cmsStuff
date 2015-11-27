var express = require('express');
var router = express.Router();
var passport = require('passport');
var authController = require('../controllers/auth');
var Order = require('../models/orders').order;
var shortid = require('shortid');
var Product = require('../models/products.js').product
router.post('/senditems', authController.postAuthenticate, function(req,res){
	if(req.body.service ='sendItems'){
		Product.find({},function(err,products){
			res.send(products);
			console.log('sent products');
		});
	} else {
		console.log(err);
	}
});

module.exports = router;
