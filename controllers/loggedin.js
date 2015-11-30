exports.isLoggedIn =
function isLoggedIn(req, res, next) {
    if (req.isAuthenticated())
        return next();
 
    res.redirect('/login');
}
exports.reqUserType = 
function reqUserType(usertype){
	return function(req,res,next){
		if(req.user){
			if(req.user.usertype === usertype || req.user.usertype == 'admin'){
				next();
			} else {
				res.redirect('/unauthorized');
			};
		};
	};
};
