var express = require('express');
var router = express.Router();
var bodyParser = require('body-parser');
var Product = require('../models/products.js').product
var pMethod = require('../models/pmethods.js').pMethod


router.get('/addpmethod',function(req,res){
	pMethod.find({},function(err, pMethods){
		if(err){
			console.error(err);
			res.send(err);
		} else {
			res.render('addpmethod',{pMethods:pMethods});
		}
	});
});
router.post('/addpmethod',function(req,res){
	var newpMethod = new pMethod({
		type:req.body.type
	});
	newpMethod.save(function(err,name){
		if(err){
			console.error(err);
			res.send(err);
		} else {
			res.send('payment method saved successfully, go back to continue.')
		}
	});
});


router.get('/addproduct', function(req,res){
	Product.find({},function(err,products){
		if(err){
			console.error(err);
			res.send(err);
		} else {
			res.render('addproduct',{products:products});
		}
	});
});
router.post('/addproduct',function(req,res){
	var newProduct= new Product({
		prodName:req.body.prodName,
		prodCode:req.body.prodCode,
		prodPrice:req.body.prodPrice
	});
	newProduct.save(function(err,name){
		if(err){
			console.error(err);
			res.send(err);
		} else {
			Product.findOne({prodName:req.body.prodName},function(err, products){
				if(err){
					console.error(err);
					res.send(err);
				}else {
					res.send('product added successfully, go back to continue');
}
});
}
});
});


module.exports = router;
