import React, { useState } from "react";
import noteContext from "./noteContext";

const NoteState = (props) => {
  const{showAlert}=props;
  const host= "https://i-notebok-main-server.vercel.app"
  const InitialNote=[]
  const[notes,setNote]=useState(InitialNote)

  //Get All notes
  const getNotes=async()=>{
    
    const response = await fetch(`${host}/api/notes/fetchallnotes`, {
      method: "GET",
      headers:{
         'Content-Type':'application/json',
         'auth-token':localStorage.getItem('token')

      },
    });
   
         const json=await response.json();
         console.log(json);
         setNote(json)
 
  }
  //AddNote
  const addNote=async(title,description,tag)=>{
    
    const response = await fetch(`${host}/api/notes/addnote`, {
      method: "POST",
      body: JSON.stringify({title,description,tag}),
      headers:{
         'Content-Type':'application/json',
         'auth-token':localStorage.getItem('token')

      },
    });
  
         
    const note=await response.json();
    setNote(notes.concat(note));

  }
  //Delete Note
  const deleteNote=async(id)=>{

    const response = await fetch(`${host}/api/notes/deletenote/${id}`, {
      method: "DELETE",
      body: JSON.stringify({id}),
      headers:{
         'Content-Type':'application/json', 
         'auth-token':localStorage.getItem('token')

      },
    });
    const newNote= notes.filter((note)=>{return note._id!==id})
    setNote(newNote);
    const json=await response.json();
    console.log(json);
    showAlert("Note deleted successfully","danger")    

   

  }
 
  
  //Edit Note
  const editNote= async(id,title,description,tag)=>{
       //API calls
       const response = await fetch(`${host}/api/notes/updatenotes/${id}`, {
        method: "PUT",
        body: JSON.stringify({title,description,tag}),
        headers:{
           'Content-Type':'application/json',
           'auth-token':localStorage.getItem('token')

        },
      });
      const json= response.json();
      console.log(json);
      
      
      //logic to edit in client
      for(let index=0;index<notes.length;index++){
        
        const element= notes[index];
        if(element._id===id){
          element.title=title;
          element.description=description;
          element.tag= tag;
        }
      }
      showAlert("Note updated successfully","success")    
  }

  return (
    <noteContext.Provider value={{ notes,setNote,addNote,deleteNote,editNote,getNotes}}>
      {props.children}
    </noteContext.Provider>
  );
};

export default NoteState;
