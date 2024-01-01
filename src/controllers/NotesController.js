const NotesModel = require('../models/NotesModel')

exports.createNote=(req,res)=>{

    const taskBody = req.body;

    NotesModel.create(taskBody)

     .then((result) => {

        if(result){

            res.status(201).json({message:"Note Created Successfully!",data:result})

        }else{

            res.status(400).json({message:"failed to Create Note!"})

        }
        
     }).catch((err) => {

        res.status(400).json({message:"failed to Create Note",error:err})

     });

}

exports.updateNote=(req,res)=>{

    const noteId = req.params['id']
    const updateBody = req.body
 

    NotesModel.updateOne({_id:noteId},updateBody)

    .then((result)=>{

        res.status(201).json({message:"Note Updated Successfully!",data:result})
  
     })
     .catch((err)=>{
  
       res.status(400).json({message:"failed to Update",error:err})
  
     })

}

exports.deleteNote =(req,res)=>{

    const noteId = req.params['id']
    NotesModel.deleteOne({_id:noteId})
    .then((result) => {

        if (result) {

            res.status(200).json({message:"Note deleted Successfully!",data:result})

            
        }else {

            res.status(400).json({message:"Failed!",data:result})

        }
        
    }).catch((err) => {

        console.log(err)
        
    });

}

exports.listNote=(req,res)=>{

    NotesModel.aggregate([
       {$project:{
        _id:1,title:1,content:1,created_at:{
            $dateToString:{
                date:"$created_at",
                format:"%d-%m-%Y"
            }
        }

       }}
    ])
    .then((result) => {

        if (result) {

            res.status(200).json({message:"Notes List!",data:result})

            
        }else {

            res.status(400).json({message:"Failed!",data:result})

        }
    }).catch((err) => {

        console.log(err)
    });

}
exports.getNote=(req,res)=>{

    const noteId = req.params['id']

    NotesModel.findOne({ _id: noteId})
    .then((result) => {

        if (result) {

            res.status(200).json({message:"Notes List!",data:result})

            
        }else {

            res.status(400).json({message:"Failed!",data:result})

        }
    }).catch((err) => {

        console.log(err)
    });

}
