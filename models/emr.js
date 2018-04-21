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

/*---------------------- Static Functions ----------------------*/
//get all EMRs
EMRSchema.statics.getEmrs = function (callback){
	EMR.find(callback);
};

//get EMR by id
EMRSchema.statics.getEmrById = function(id,callback){
	const query = {id: id};
	EMR.findOne(query, callback);
};

//get EMR by name
EMRSchema.statics.getEmrByName = function(name,callback){
	const query = {name: name};
	EMR.findOne(query, callback);
};

//delete EMR by id
EMRSchema.statics.removeEmrById = function(id, callback){	
    const query = {id: id};
    EMR.find(query).remove(callback);
}

//create new EMR
EMRSchema.statics.addEmr = function (newEmr, callback) {
    newEmr.save(callback);
};

//update existing EMR
EMRSchema.statics.updateEmr = function (updtEmr, callback) {
	EMR.find({id: updtEmr.id}).update({$set: updtEmr}, callback)
}

const EMR = module.exports = mongoose.model('EMR', EMRSchema);