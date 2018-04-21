const mongoose = require('mongoose');
const config = require('../config/database');
const Schema = require('mongoose').Schema;

const EMRSchema = new Schema({
	id: {
		type: String,
		required: true,
		index: true
	},
	name: {
        type: String,
        required: true
	},
	address: {
		type: String
	},
	medications: {
		type: [String]
	},
	birthdate: {
		type: String
	},
	provider: {
		type: String
	}
});

EMRSchema.statics.getEmrs = function (callback){
	EMR.find(callback);
};

EMRSchema.statics.getEmrById = function(id,callback){
	const query = {id: id};
	EMR.findOne(query, callback);
};

EMRSchema.statics.getEmrByName = function(name,callback){
	const query = {name: name};
	EMR.findOne(query, callback);
};

EMRSchema.statics.removeEmrById = function(id, callback){	
    const query = {id: id};
    EMR.find(query).remove(callback);
}

EMRSchema.statics.addEmr = function (newEmr, callback) {
    newEmr.save(callback);
};

const EMR = module.exports = mongoose.model('EMR', EMRSchema);

/*module.exports.getEmrs = function (callback){
	EMR.find(callback);
};

module.exports.getEmrById = function(id,callback){
	const query = {id: id};
	EMR.findOne(query, callback);
};

module.exports.getEmrByName = function(name,callback){
	const query = {name: name};
	EMR.findOne(query, callback);
};

module.exports.removeEmrById = function(id, callback){	
	EMR.findByIdAndRemove(id, callback);
}

module.exports.addEmr = function (newEmr, callback) {
	newEmr.save(callback);
};*/