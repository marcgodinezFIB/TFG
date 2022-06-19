'use strict'

const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const RecentProductSchema = new Schema({
    user: {type: String, required: [true]},
    product: {type: String, required: [true]},
    insertDate: { type: Date, default: Date.now() },

})




module.exports = mongoose.model('RecentProduct', RecentProductSchema)