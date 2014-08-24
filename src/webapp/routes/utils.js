

//Check if resquest is logged in
module.exports.isLoggedIn = function (req, res, next) {
	if (req.isAuthenticated())
		return next();

	res.redirect('/account/unauthorize');
}
