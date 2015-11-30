var express = require('express');
var router = express.Router();

router.get('/unauthorized', function(req,res){
	res.render('unauthorized');
});

module.exports = router;
