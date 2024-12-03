import React, { useContext, useEffect, useRef, useState } from "react";
import NoteItems from "../components/NoteItems";
import noteContext from "../context/notes/noteContext";
import Addnote from "./Addnote";
          import { useHistory } from "react-router-dom/cjs/react-router-dom.min";
const Notes = (props) => {
  const context = useContext(noteContext);
  let history= useHistory();
  const { showAlert } = props;
  const { notes, getNotes, setNote } = context;
  const host = "http://localhost:5000/";

  useEffect(() => {
    if (localStorage.getItem('token')) {  

      getNotes();

    }
    else{
      history.push('/login');
    }
  }, []);

  const ref = useRef(null);
  const closeRef = useRef(null);

  // Separate state for editing a note
  const [editingNote, setEditingNote] = useState({
    etitle: "",
    edescription: "",
    etag: "",
    _id: "",
  });

  const updateNote = (currentNote) => {
    ref.current.click();
    setEditingNote({
      etitle: currentNote.title,
      edescription: currentNote.description,
      etag: currentNote.tag,
      _id: currentNote._id,
    });
  };

  const handleClick = async (e) => {
    e.preventDefault();

    // Validate form fields
    if (!editingNote.etitle || !editingNote.edescription || !editingNote.etag) {
      alert("Please fill in all fields before updating the note.");
      return;
    }

    try {
      // API call to update the note in the backend
      const response = await fetch(
        `${host}api/notes/updatenotes/${editingNote._id}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
            "auth-token":localStorage.getItem('token'),
          },
          body: JSON.stringify({
            title: editingNote.etitle,
            description: editingNote.edescription,
            tag: editingNote.etag,
          }),
        }
      );

      const updatedNote = await response.json();

      if (response.ok) {
        // Update state with the modified note
        const updatedNotes = notes.map((note) =>
          note._id === updatedNote._id ? updatedNote : note
        );
        setNote(updatedNotes); // Update notes state
        showAlert("Note updated successfully", "success");

        closeRef.current.click();
        // setEditingNote({ etitle: "", edescription: "", etag: "", _id: "" }); // Clear form
        await getNotes(); // Re-fetch all notes
      } else {
        alert(`Failed to update note: ${updatedNote.error}`);
      }
    } catch (error) {
      console.error("Error updating note:", error);
      alert("An error occurred while updating the note.");
    }
  };

  const onChange = (e) => {
    setEditingNote({ ...editingNote, [e.target.name]: e.target.value });
  };

  return (
    <>
      <Addnote showAlert={showAlert} />

      <button
        ref={ref}
        type="button"
        className="btn btn-primary d-none"
        data-bs-toggle="modal"
        data-bs-target="#exampleModal"
      >
        Launch demo modal
      </button>

      <div
        className="modal fade"
        id="exampleModal"
        tabIndex="-1"
        role="dialog"
        aria-labelledby="exampleModalLabel"
        aria-hidden="true"
      >
        <div className="modal-dialog" role="document">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title" id="exampleModalLabel">
                Edit Note
              </h5>
              <button
                type="button"
                className="btn-close"
                data-bs-dismiss="modal"
                aria-label="Close"
              ></button>
            </div>
            <div className="modal-body">
              <form className="my-3">
                <div className="mb-3">
                  <label className="form-label">Note Title</label>
                  <input
                    type="text"
                    id="etitle"
                    name="etitle"
                    value={editingNote.etitle}
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
                    id="edescription"
                    name="edescription"
                    value={editingNote.edescription}
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
                    id="etag"
                    name="etag"
                    value={editingNote.etag}
                    onChange={onChange}
                    className="form-control"
                  />
                </div>
              </form>
            </div>
            <div className="modal-footer">
              <button
                type="button"
                ref={closeRef}
                className="btn btn-secondary"
                data-bs-dismiss="modal"
              >
                Close
              </button>
              <button
                type="button"
                onClick={handleClick}
                className="btn btn-primary"
              >
                Update Note
              </button>
            </div>
          </div>
        </div>
      </div>

      <div className="container row my-3">
        <h2>Your Notes</h2>
        <div className="container mx-1">
          {notes.length === 0 && "No Notes to display...."}
        </div>
        {Array.isArray(notes) &&
          notes.map((note) => (
            <NoteItems key={note._id} updateNote={updateNote} note={note} />
          ))}
      </div>
    </>
  );
};

export default Notes;
