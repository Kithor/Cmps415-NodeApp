const mongoose = require('mongoose');
const config = require('../config/database');
const Schema = require('mongoose').Schema;

const lockSchema = new Schema({
    /*id: {
        type: String,
		required: true,
		index: true
    },*/
    ts: {
        type: Date,
        required: true,
        default: Date.now,
        expires: 120
    }
})

/*---------------------- Static Functions ----------------------*/
lockSchema.statics.getLockById = function (id, callback) {
    var query = {_id: id}
    lock.findOne(id, callback)
}

lockSchema.statics.createLock = function (id, callback) {
    id = new lock({_id: id})
    id.save(callback)
}

lockSchema.statics.removeLock = function (id, callback) {
    var query = {_id: id}
    lock.find(query).remove(callback);
}

const lock = module.exports = mongoose.model('lock', lockSchema)