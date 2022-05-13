'use strict'

const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const FavoriteProductSchema = new Schema({
    user: {type: Schema.Types.ObjectId, required: [true]},
    product: {type: Schema.Types.ObjectId, required: [true]},
})




module.exports = mongoose.model('FavoriteProduct', FavoriteProductSchema)