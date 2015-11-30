var express = require('express');
router = express.Router();
var mongoose = require('mongoose');
var User = require('../models/users.js');
router.get('/register',function(req,res){
	res.render('register');
});
router.post('/register',function(req,res){
	var newUser = new User({
		username:req.body.username,
		password:req.body.password,
		email:req.body.email,
		usertype: req.body.usertype
	});
	newUser.save(function(err){
		if(err)
			res.send(err)
		res.send('new user added');
	});
});
module.exports = router;
