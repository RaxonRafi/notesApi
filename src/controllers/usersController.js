const usersModel = require('../models/usersModel')
const { use } = require('../routes/api')
const jwt = require('jsonwebtoken')

exports.Register=(req,res)=>{

    const userData = req.body

    usersModel.create(userData)

    .then((result) => {

        if(result){

            res.status(201).json({message:"User Registered Successfully!",data:result})

        }else{

            res.status(400).json({message:"failed to register user!"})

        }
        
    }).catch((err) => {
        
        res.status(400).json({message:"failed to register user!",error:err})
        
    });

}

exports.login=(req,res)=>{

    const userReq = req.body
    usersModel.aggregate([
        {$match:userReq},
        {$project:{_id:0,email:1,FirstName:1,LastName:1,phone:1}}
    ])
    .then((result)=>{

        let Payload ={
            exp:Math.floor(Date.now()/1000)+(60*60),
            data:result
        }
        let Token = jwt.sign(Payload,"MuhammadRafi2318");
        
        res.status(200).json({message:"User logged in Successfully!",data:result,token:Token})

    })
    .catch((err)=>{

        res.status(401).json({message:"failed to login",error:err})

    })

}
