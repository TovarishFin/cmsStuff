//load required modules
var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var mongoose = require('mongoose');
var reqAuth = require('./routes/reqAuth/reqAuth');
var noAuth = require('./routes/noAuth/noAuth');
var connection=mongoose.connect('mongodb://heroku_xb4vlx5k:bakrvris7esr5jf5tdqminavrh@ds051334.mongolab.com:51334/heroku_xb4vlx5k');
var session =require('express-session');
var app = express();
var passport = require('passport');
var authController = require('./controllers/auth');
var User = require('./models/users');
var loggedIn = require('./controllers/loggedin');
var apiRoutes = require('./routes/reqAuth/api/apiroutes');
var checkShipped = require('./utils/checkShipped');
// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

//test routes for testing....
app.get('/test',function(req,res){
	User.find({},function(err,users){
		res.json(users);
	});
});

// include favicon
app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
//load up middleware
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.use(session({secret:'whatever',resave:true,saveUninitialized:true}));
app.use(passport.initialize());
app.use(passport.session());
//load up different route paths
app.use('/', noAuth);
app.use('/api', apiRoutes);
app.use('/',loggedIn.isLoggedIn, reqAuth);

//check that orders are shipped (test and non test...only works with real tracking numbers...)
checkShipped.checkShippedLive();
checkShipped.checkShippedTest();


// catch 404 and forward to error handler
app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});
// error handlers

// development error handler
// will print stacktrace
if (app.get('env') === 'development') {
  app.use(function(err, req, res, next) {
    res.status(err.status || 500);
    res.render('error', {
      message: err.message,
      error: err
    });
  });
}

// production error handler
// no stacktraces leaked to user
app.use(function(err, req, res, next) {
  res.status(err.status || 500);
  res.render('error', {
    message: err.message,
    error: {}
  });
});
//listen on port defined by environment
app.listen(process.env.PORT)

module.exports = app;
