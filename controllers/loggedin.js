exports.isLoggedIn =
function isLoggedIn(req, res, next) {
    if (req.isAuthenticated())
        return next();
 
    res.redirect('/login');
}
exports.reqUserType = 
function reqUserType(usertype){
	return function(req,res,next){
		if(req.user && req.user.usertype ===(usertype || 'admin'))
		next();
	else
		res.send(401, 'Unauthorized');
	};
};
