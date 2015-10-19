var express = require('express');
var router = express.Router();
var bodyParser = require('body-parser');
var Product = require('../models/products.js').product
var Order = require('../models/orders.js').order
var Customer = require('../models/customers.js').customer
var pMethod = require('../models/pmethods.js').pMethod
var session = require('express-session');
var stripe = require('stripe')('sk_test_6ydpToQCedRDhc8SYyyLyDfM');
var shortid = require('shortid');
var postmaster = require('postmaster-shipping')({
	apiKey: 'tt_MTMyOTEwMDE6NU5fWENFNllxZG15cnhPMkhtcWZmLUhlUGcw',
	password: 'Steelseries88'
},true);
	

router.use(session({
	cookie: {
		maxAge: 60*60*60*1000*1000000
	},
	secret:'whateverfloatsyourboatman',
	resave: false,
	saveUninitialized: false
}));
/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

router.get('/addpmethod',function(req,res){
	pMethod.find({},function(err, pMethods){
		if(err){
			console.error(err);
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
		} else {
			res.send('payment method saved successfully, go back to continue.')
		}
	});
});

router.get('/addproduct', function(req,res){
	Product.find({},function(err,products){
		if(err){
			console.error(err);
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
		} else {
			Product.findOne({prodName:req.body.prodName},function(err, products){
				if(err){
					console.error(err);
				}else {
					res.send('product added successfully, go back to continue');
}
});
}
});
});

router.get('/addorder',function(req,res){
	Order.find({},function(err, orders){
		if(err){
			console.error(err)
		} else {
			pMethod.find({},function(err, pMethods){
				if(err){
					console.error(err);
				} else {
					Product.find({},function(err,products){
						if(err){
							console.error(err);
						} else {
						res.render('addorder',{orders:orders, pMethods:pMethods, products:products});
						console.log(orders, pMethods, products)
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
	console.log(req.session);
 });

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
		orderID: shortid.generate()
	});
	newOrder.save(function(err,name){
		if(err){
			console.error(err);
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
				} else {
					res.send('customer info/order saved');
				}
			});
		} else {
			res.send('order saved, customer info already existed');
		}
	});
});

router.get('/runpayment', function(req,res){
	Order.find({orderStatus:0},function(err,orders){
		if(err){
			console.error(err)
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

router.get('/paidorders', function(req,res){
	Order.find({orderStatus:1},function(err,orders){
		res.render('paidorders',{orders:orders});
	});
});
router.post('/paidorders',function(req,res){
	Order.findOneAndUpdate({orderID:req.body.orderID},{orderStatus:2},function(err,order){
		if(err){
			res.send(error);
		} else {
			res.send('order was approved by qa and moved to status "2"');
		}
	});
});
router.get('/shipping',function(req,res){
	Order.find({orderStatus:2},function(err,orders){
		if(err){
			res.send(err)
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
			Order.findOneAndUpdate({orderID:req.body.orderID},{orderStatus:3,tNum:response.tracking[0],sLabel:response.packages[0].label_url},function(err,order){
				if(err){
					res.send(err)
				} else {
					res.send('shipping label has been created at '+'api.postmaster.io'+response.packages[0].label_url+' and order status has been updated to 3');
					console.log(response);
				}
			});
		};
	});
});

router.get('/printorders',function(req,res){
	Order.find({orderStatus:3},function(err,orders){
		if(err){
			console.error(err)
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
			res.send('order printed, order status updated to 4');
		}
	});
});


router.get('/test',function(req,res){
	json={ status: 'Processing',
  commercial_invoice: '',
  tracking: [ '1Z8V81310298767935' ],
  cost: 1710,
  prepaid: false,
  service: '2DAY',
  package_count: 1,
  created_at: 1445208125,
  saturday: false,
  to: 
   { city: 'Reno',
     country: 'US',
     company: 'personal',
     phone_no: '7752743272',
     line1: '1426 Camden Street',
     state: 'NV',
     contact: 'Gary Russell',
     residential: true,
     zip_code: '89501' },
  carrier: 'ups',
  id: 5672749318012928,
  from: 
   { city: 'Reno',
     country: 'US',
     company: 'derpology inc.',
     phone_no: '775-274-3272',
     line1: '1426 Camden Street',
     state: 'NV',
     contact: 'derpmaster funk',
     residential: true,
     zip_code: '89501' },
  packages: 
   [ { weight_units: 'LB',
       weight: 1.5,
       type: 'CUSTOM',
       height: 8,
       width: 6,
       length: 10,
       label_url: '/v1/label/AMIfv95UNRC6i7haV5Vy4PiGTlXlPtemCzQNX0ZHQupNAbHHsXvfSpJj8hylShaPftCPAO8FKCxnEjms8y8vTj1Lt63nuCu6cEbkfHpXc8P8WD1_1ue8DmWXe_OiZmaf0mG9RKYJcaSdwVJWm-63P_duwRA0KT5QlZVDluOX7SUB6QSJWUXl2yI',
       dimension_units: 'IN' } ],
  additional_data: {} }
res.send(json);
});

module.exports = router;
