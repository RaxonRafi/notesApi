const mongoose = require('mongoose')

const DataSchema = mongoose.Schema({
    title:{type:String,required:true},
    content:{type:String,required:true},
    created_at:{type:Date,default: Date.now()}

},{versionKey:false});
const NotesModel = mongoose.model('notes',DataSchema);
module.exports = NotesModel;