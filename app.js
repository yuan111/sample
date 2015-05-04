var express = require('express')
var path = require('path')
var port = process.env.PORT || 3000
var app = express()
// for openshift server side
var ipaddress = process.env.OPENSHIFT_NODEJS_IP || "127.0.0.1"
var port = process.env.OPENSHIFT_NODEJS_PORT || 8000


//mongoDB setup
var mongoose = require('mongoose')
// var dbUrl = 'mongodb://localhost/webdb'
// for openshift server side
// var dbUrl = 'mongodb://' + process.env.OPENSHIFT_MONGODB_DB_USERNAME + ':' +
//     process.env.OPENSHIFT_MONGODB_DB_PASSWORD + "@" +
//     process.env.OPENSHIFT_MONGODB_DB_HOST + ':' +
//     process.env.OPENSHIFT_MONGODB_DB_PORT + '/' +
//     process.env.OPENSHIFT_APP_NAME;
// mongoose.connect(dbUrl)
mongoose.connect('mongodb://localhost/sample')

var Product = require('./models/product')


//require dependencies 
app.locals.moment = require('moment')
var _ = require('underscore')
//bodyParser is no longer bundled with Express
var bodyParser = require('body-parser')
app.use(bodyParser.json());                        
app.use(bodyParser.urlencoded({ extended: true }))


//set view engine
app.set('views','./views/pages')
app.set('view engine','jade')

app.use(express.static(path.join(__dirname, 'public')))
//listen port
app.listen(port)
// app.listen(port,ipaddress)
console.log('project started on port'+port)



//index page
app.get('/', function(req, res){
	Product.fetch(function(err, products){
		if(err) throw err;
		res.render('index',{
			title:'homepage',
			products: products
		})
	})
})

//ui page
app.get('/ui', function(req, res){
	Product.fetch(function(err, products){
		if(err) console.log(err)
		res.render('ui',{
			title:'ui page',
			products: products
		})
	})
})
// ui details page
app.get('/ui/:id', function(req, res){
	var id = req.params.id
	console.log(id)
	var selected_item	
	Product.findById(id,function(err, product){
		if(err) console.log(err)
		selected_item = product 
	})
	// console.log(product._id)

	Product.fetch(function(err, products){
		if(err) console.log(err)
		res.render('detail',{
			title:'ui page',
			products: products,
			selected_item: selected_item
		})
	})

})
// post method to update product
app.post('/admin/products/update',function(req, res){
	var id = req.body.product._id
	var productObj = req.body.product
	var _product

	Product.findById(id, function(err, product){
		if(err) throw err;
		_product = _.extend(product, productObj)
		_product.save(function(err, product){
			if(err) throw err;
			res.redirect('/admin/list')
		})
	})
})

// post method to add new product
app.post('/admin/products/new', function(req, res){
	var productObj = req.body.product
	console.log(req.body)
	var _product

	_product = new Product({
		name: productObj.name,
		price: productObj.price,
		description: productObj.description,
		image: productObj.image
	})

	_product.save(function(err, product){
		if(err){
			console.log(err)
		}
		res.redirect('/admin/list')
	})
})

// delete method to remove product
app.delete('/admin/list', function(req, res){
	var id = req.query.id
	console.log(id)
	if(id){
		Product.remove({_id: id}, function(err, product){
			if(err) {console.log(err)}
			else{res.json({success: 1})}

		})
	}
})

//admin page
app.get('/admin/list', function(req, res){
	Product.fetch(function(err, products){
		if(err){
			console.log(err)
		}
		res.render('admin',{
			title:' admin page',
			products: products
		})
	})
})

