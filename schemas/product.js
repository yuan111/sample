var mongoose = require('mongoose')

// create a schema
var ProductSchema = new mongoose.Schema({
	name: String,
	price: Number,
	description: String,
	image: String,
	createAt: Date,
	updateAt: Date
})

// on every save, add/update the date information
ProductSchema.pre('save', function(next){
	if(this.isNew){
		this.createAt = this.updateAt = Date.now()
	}
	else{
		this.updateAt = Date.now()
	}
	next()
})

ProductSchema.statics = {
	// get all data from DB
	fetch: function(cb) {
		return this.find({}).sort('name').exec(cb)
	},

	findById: function(id, cb) {
		return this.findOne({_id: id}).exec(cb)
	}
}

module.exports = ProductSchema




















