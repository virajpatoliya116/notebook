import React from 'react';
import {useContext} from 'react'
import noteContext from '../context/notes/noteContext';

const NoteItem = (props) => {
  const a = useContext(noteContext)
  const {deleteNote} = a;
  const {note, updateNote, showAlert} = props;

  // console.log(note)
  return (
    <div className="col-md-3 my-1">
      <div className="card">
        <div className="card-body">
          <div className="d-flex align-items-center justify-content-between">
            <h5 className="card-title">{note.title}</h5>
            <div className="icon">
              <i class="fa-solid fa-pen-to-square mx-2" onClick={() => {updateNote(note);}}></i>
              <i class="fa-solid fa-trash-can mx-2" onClick={() => {deleteNote(note._id); showAlert("Note Deleted Successfully", "success")}}></i>
            </div>
          </div>
          <p className="card-text">{note.description}</p>
          {/* <a href="#" className="btn btn-primary">Go somewhere</a> */}
        </div>
      </div>
    </div>
  )
}

export default NoteItem
