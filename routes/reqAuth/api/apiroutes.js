var express = require('express');
var router = express.Router();
var passport = require('passport');
var authController = require('../../../controllers/auth');
var Order = require('../../../models/orders').order;
var shortid = require('shortid');
router.use(require('./sendItems'));
router.use(require('./getOrders'));

module.exports = router;
