const { Router } = require('express');
const express = require('express');
const usersController = require('../controllers/usersController')
const NotesController = require('../controllers/NotesController')

const TokenVerifyMiddleware = require('../middleware/TokenVerifyMiddleware');
const router = express.Router();

router.post("/Register",usersController.Register)
router.post("/login",usersController.login)


// Notes

router.post("/createNote",TokenVerifyMiddleware,NotesController.createNote)
router.post("/updateNote/:id",TokenVerifyMiddleware,NotesController.updateNote)
router.get("/deleteNote/:id",TokenVerifyMiddleware,NotesController.deleteNote)
router.get("/listNote",TokenVerifyMiddleware,TokenVerifyMiddleware,NotesController.listNote)
router.get("/getNote/:id",TokenVerifyMiddleware,TokenVerifyMiddleware,NotesController.getNote)



module.exports=router;