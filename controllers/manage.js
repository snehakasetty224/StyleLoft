'use strict';

var Apparel = require('../models/apparelModel');
var Category = require('../models/categoryModel');

module.exports = function(router){
	router.get('/', function(req, res){
		res.render('manage/index');
	});

	router.get('/apparels', function(req, res){
		Apparel.find({}, function(err, apparels){
    		if(err){
    			console.log(err);
    		}

    		var model = {
    			apparels: apparels
    		}
    		res.render('manage/apparels/index', model);
    	});
	});

	router.get('/apparels/add', function(req, res){
		Category.find({}, function(err, categories){
			if(err){
				console.log(err);
			}
			
			var model = {
				categories: categories
			}
			res.render('manage/apparels/add', model);
		});
	});

	router.post('/apparels', function(req, res){
		var title = req.body.title && req.body.title.trim();
		var description = req.body.description && req.body.description.trim();
		var category = req.body.category && req.body.category.trim();
		var price = req.body.price && req.body.price.trim();
		var cover = req.body.cover && req.body.cover.trim();

		if(title == '' || price == ''){
			req.flash('error', "Please fill out the required fields");
			res.location('/manage/apparels/add');
			res.redirect('/manage/apparels/add');
		}

		if(isNaN(price)){
			req.flash('error', "Price must be a number");
			res.location('/manage/apparels/add');
			res.redirect('/manage/apparels/add');
		}

		var newApparel = new Apparel({
			title: title,
			description: description,
			category: category,
			price: price,
			cover: cover
		});


		newApparel.save(function(err){
			if(err){
				console.log('SAVE ERROR: ', err);
			}
			req.flash('success', "Apparel Added");
			res.location('/manage/apparels');
			res.redirect('/manage/apparels');
		});

	});

	router.get('/categories', function(req, res){
		res.render('manage/categories/index');
	});

};


//////////////
