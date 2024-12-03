const express = require("express");
const router = express.Router();
var fetchuser = require("../middleware/fetchuser");
const Notes = require("../models/Notes");
const { body, validationResult } = require("express-validator");

//Route 1: Get all the notes using: GET"api/notes/fetchallnotes Login required.
router.get("/fetchallnotes", fetchuser, async (req, res) => {
  try {
    const notes = await Notes.find({ user: req.user.id });
    res.json(notes);
  } catch (error) {
    console.error(error.message);
    res.status(500).send("Internal server error");
  }
});
//Route 2: Add notes using: POST"api/notes/addnote Login required.
router.post(
  "/addnote",
  [
    body("title", "Enter a valid title").isLength({ min: 3 }),
    body("description", "Description must be at least 5 chars").isLength({ min: 5 }),
  ],
  fetchuser, // Middleware to fetch authenticated user
  async (req, res) => {
    try {
      const { title, description, tag } = req.body;

      // Validate incoming request
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
      }

      // Create a new note
      const notes = new Notes({
        title,
        description,
        tag,
        user: req.user.id, // ID fetched from token by fetchuser middleware
      });

      const savedNotes = await notes.save();
      res.json(savedNotes);
    } catch (error) {
      console.error(error.message);
      res.status(500).send("Internal Server Error");
    }
  }
);
//Route 3: Update notes using: PUT"api/notes/updatenote Login required.
 
router.put("/updatenotes/:id", fetchuser, async (req, res) => {

    const{title,description,tag}= req.body;
          try {
            
          
        //Create a newNote object
        const newNote= {};
        if(title){
            newNote.title= title;
        }
        if(description){
            newNote.description= description;
        }
        if(tag){
            newNote.tag= tag;
        }

        // Find the new note to be updated and update it

        let note= await Notes.findById(req.params.id);
         if(!note){
            return res.status(404).send("Not Found");

         }
         if(note.user.toString()!==req.user.id){
            return res.status(401).send("Not Allowed");
         }

         note= await Notes.findByIdAndUpdate(req.params.id,{$set:newNote},{new:true});

         res.json({note}); 
        } catch (error) {
          console.error(error.message);
          res.status(500).send("Internal server error");
        }
});  
//Route 4: delete notes using: PUT"api/notes/deletenote Login required.
 
router.delete("/deletenote/:id", fetchuser, async (req, res) => {

       

        // Find the new note to be updated and update it
   try {
    
   
        let note= await Notes.findById(req.params.id);
         if(!note){
            return res.status(404).send("Not Found");

         }
         if(note.user.toString()!==req.user.id){
            return res.status(401).send("Not Allowed");
         }

         note= await Notes.findByIdAndDelete(req.params.id);

         res.json({"Success": "Note has been successfully deleted!",note:note}); 
         
        } catch (error) {
          console.error(error.message);
          res.status(500).send("Internal server error");
        }
});  

module.exports = router;
