var express = require('express'),
	router = express.Router(),
	info = require('../../../package.json'),
	categoryRepo = new (require('../../repository/categoryRepository'));

/* GET home page. */
router.get('/', function(req, res) {
	categoryRepo.getCategoriesInfo(function(err, categories){	
		res.render('index', { categories: categories });
	});
});

router.get('/about', function(req, res) {
  res.send({ 'version': info.version, 'author': info.author });
});

module.exports = router;
