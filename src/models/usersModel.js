const mongoose = require('mongoose')

const DataSchema = mongoose.Schema({

    FirstName:{type:String,required:true},
    LastName:{type:String,required:true},
    email:{type:String,required:true,unique:true},
    password:{type:String,required:true},
    created_at:{type:Date,default: Date.now()}

},{versionKey:false})
const usersModel = mongoose.model('users',DataSchema)
module.exports = usersModel