var express=require('express')
var router=express.Router();
var session = require('express-session');
var Order = require('../models/orders.js').order
var pMethod = require('../models/pmethods.js').pMethod
var Product = require('../models/products.js').product

router.use(session({
	cookie: {
		maxAge: 60*60*60*1000*1000000
	},
	secret:'whateverfloatsyourboatman',
	resave: false,
	saveUninitialized: false
}));

router.get('/addorder',function(req,res){
	Order.find({},function(err, orders){
		if(err){
			console.error(err);
			res.send(err);
		} else {
			pMethod.find({},function(err, pMethods){
				if(err){
					console.error(err);
					res.send(err);
				} else {
					Product.find({},function(err,products){
						if(err){
							console.error(err);
							res.send(err);
						} else {
						res.render('addorder',{orders:orders, pMethods:pMethods, products:products});
						}
					});		
				}
			});
		}
	});
});
router.post('/addorder', function(req,res){
	req.session.order=req.body
	res.redirect('addcustomer');
 });
 
 module.exports=router;
