// import React,{useContext, useState} from "react";
// import noteContext from "../context/notes/noteContext";



// const Addnote = () => {
//     const context= useContext(noteContext);
//     const{addNote}=context;
         
//     const[notes,setNote]=useState({title:"",description:"",tag:""})
//     const handleClick=(e)=>{
//         e.preventDefault();
//        addNote(notes.title,notes.description,notes.tag);

//     }
//     const onChange=(e)=>{
           
//         setNote({...notes,[e.target.name]:e.target.value})

//     }
//   return (
//     <div>
//         <div className="container my-3">
//       <h1> Add Note</h1>
//         <form className="my-3">
//           <div className="mb-3">
//             <label className="form-label">Note Title</label>
//             <input type="text" id="title" name="title" onChange={onChange} className="form-control" />
//             {/* <div id="emailHelp" className="form-text">
//               We'll never share your email with anyone else.
//             </div> */}
//           </div>
//           <div className="mb-3">
//             <label htmlFor="" className="form-label">
//               Note Description
//             </label>
//             <input type="text" id="description" name="description" onChange={onChange}  className="form-control" />
//             <label htmlFor="" className="form-label">
//               Note tag
//             </label>
//             <input type="text" id="tag" name="tag" onChange={onChange} className="form-control" />
//           </div>

//           <button type="submit" onClick={handleClick} className="btn btn-primary">
//             Add Note
//           </button>
//         </form>
//       </div>
//     </div>
//   )
// }

// export default Addnote
import React, { useContext, useState } from "react";
import noteContext from "../context/notes/noteContext";

const Addnote = (props) => {
  const context = useContext(noteContext);
  const { addNote } = context;

  const [notes, setNote] = useState({ title: "", description: "", tag: "" });

  const handleClick = (e) => {
    e.preventDefault();
    if (!notes.title || !notes.description || !notes.tag) {
      alert("Please fill in all fields before adding a note.");
      return;
    }
    addNote(notes.title, notes.description, notes.tag);
    props.showAlert("New Note added","success");
    setNote({ title: "", description: "", tag: "" }); // Clear the form

  };

  const onChange = (e) => {
    setNote({ ...notes, [e.target.name]: e.target.value });
  };

  return (
    <div className="container" style={{postion:"fixed"}}>
      <div className="container my-3">
        <h1>Add Note</h1>
        <form className="my-3">
          <div className="mb-3">
            <label className="form-label">Note Title</label>
            <input
              type="text"
              id="title"
              name="title"
              value={notes.title}
              onChange={onChange}
              className="form-control"
            />
          </div>
          <div className="mb-3">
            <label htmlFor="" className="form-label">
              Note Description
            </label>
            <input
              type="text"
              id="description"
              name="description"
              value={notes.description}
              onChange={onChange}
              className="form-control"
            />
          </div>
          <div className="mb-3">
            <label htmlFor="" className="form-label">
              Note Tag
            </label>
            <input
              type="text"
              id="tag"
              name="tag"
              value={notes.tag}
              onChange={onChange}
              className="form-control"
            />
          </div>
          <button
            type="submit"
            onClick={handleClick}
            className="btn btn-primary"
          >
            Add Note
          </button>
        </form>
      </div>
    </div>
  );
};

export default Addnote;
