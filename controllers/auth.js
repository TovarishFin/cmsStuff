var passport = require('passport');
var User = require('../models/users');
var LocalStrategy = require('passport-local').Strategy;
var BasicStrategy = require('passport-http').BasicStrategy;
passport.use(new LocalStrategy(
  function(username, password, done) {
    User.findOne({ username: username }, function (err, user) {
      if (err) { return done(err); }
      if (!user) {
        return done(null, false, { message: 'Incorrect username.' });
      }
      if (!user.validPassword(password)) {
        return done(null, false, { message: 'Incorrect password.' });
      }
      return done(null, user);
    });
  }
));

passport.use(new LocalStrategy(
	function(username,password,done){
		User.findOne({username:username},function(err,user){
			if(err) {return done(err);}
			if(!user) {return done(null,false)};
			user.verifyPassword(password, function(err,isMatch){
				if(err) {return callback(err);}
				if(!isMatch) {return callback(null,false);}	
				return done(null,user);
				
			});
		});
	}
));



passport.use(new BasicStrategy(
	function(username, password, callback){
		User.findOne({username:username},function(err,user){
			if(err){return callback(null,false);}
			if(!user){return callback(null,false);}
			user.verifyPassword(password,function(err,isMatch){
				if(err){return callback(err);}
				if(!isMatch){return callback(null,false);}
				return callback(null,user);
			});
		});
	}
));

passport.serializeUser(function(user, done) {
  done(null, user.id);
});

passport.deserializeUser(function(id, done) {
  User.findById(id, function(err, user) {
    done(err, user);
  });
});
exports.postAuthenticate = passport.authenticate('basic',{
	session:false
	});
exports.isAuthenticated = passport.authenticate('local',{
	session:true,
	successRedirect:'/',
	failureRedirect:'/login',
	failureFlash:false
	});			
