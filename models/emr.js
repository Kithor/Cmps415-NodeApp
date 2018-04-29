const mongoose = require('mongoose');
const config = require('../config/database');
const Schema = require('mongoose').Schema;
const lock = require('./lock')

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
EMRSchema.statics.getEmrById = function(id, callback){
	const query = {id: id};
	var mes, emr
	EMR.findOne(query, (err, emr) =>{									//find record
		if(err){
			mes = "Could not retrieve record"
		}
		else{
			lock.getLockById(emr._id, (err, lk) => {
				if(err){
					mes = "Could not retrieve lock information"
					callback(mes)
				}
				else if(lk != null){									//check if lock is in place
					mes = "The record is locked"
					callback(mes)
				}
				else{													//create lock and return record
					lock.createLock(emr._id, (err) => {
						if(err){
							mes = "Could not lock the record"
							callback(mes)
						}
						callback(mes, emr)
					})
				}
			})
		}
	})
};

//get EMR by name
EMRSchema.statics.getEmrByName = function(name, callback){
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
	EMR.findOne({id: updtEmr.id}, (err, emr) => {
		lock.removeLock(emr._id, (err) => {
			if (err) {
				console.log(err)
			}
		})
	}).update({$set: updtEmr}, callback)
}

const EMR = module.exports = mongoose.model('EMR', EMRSchema);