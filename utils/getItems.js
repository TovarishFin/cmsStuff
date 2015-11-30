var express = require('express');
var router = express.Router();
var request = require('request');
username = 'clamson',
password = 'test'
AuthHeader = username+":"+password;
AuthHeader64 = new Buffer(AuthHeader).toString('base64');
exports.getItemsOptions ={
	method: 'POST',
	uri:'https://fierce-sea-8251.herokuapp.com/api/sendItems',
	form:{
		service:'getItems',
	},
	headers:{
		'Authorization': 'Basic ' + AuthHeader64
	}
};
