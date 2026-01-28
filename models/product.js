const mongoose = require('mongoose');

//SCHEMA

const productSchema = new mongoose.Schema({
    name:{
        type:String,
        required:true,
    },
    price:Number,

    quantity:Number,

    description:String,

    brand:String,

    category:String,

    Store:{
        type:mongoose.Schema.Types.ObjectId,
        ref:('Store') 
    }
})

const Product = mongoose.model('Product',productSchema)

module.exports = Product;