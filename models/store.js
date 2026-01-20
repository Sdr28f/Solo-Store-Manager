const mongoose = require('mongoose');

// SCHEMA

const storeSchema = new mongoose.Schema({
    businessName:{
        type:String,
        required:true,
    },
    category:{
        type:String,
        required:true,
    },
    contactUs:{
        type:String,
        required:true,
    },
    description:{
        type:String,
        required:true,
    },
    isActive:Boolean,

    owner:{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    }
})

// MODEL
const Store = mongoose.model('Store',storeSchema)


module.exports = Store;