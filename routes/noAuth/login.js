var express = require('express');
var router = express.Router();
var passport = require('passport');
var authController = require('../../controllers/auth');

router.get('/login',function(req,res){
	res.render('login');
});
router.post('/login', authController.isAuthenticated);

module.exports = router;
