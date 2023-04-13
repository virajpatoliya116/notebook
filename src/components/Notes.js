import React from 'react'
import { useEffect } from 'react'
import { useRef } from 'react'
import { useContext, useState } from 'react'
import noteContext from '../context/notes/noteContext'
import AddNote from './AddNote'
import NoteItem from './NoteItem'
import { useNavigate } from 'react-router-dom'

const Notes = (props) => {
  const navigate = useNavigate();
  const a = useContext(noteContext)
  const { notes, getNotes, editNote } = a
  // console.log(notes)
  useEffect(() => {
    if(localStorage.getItem('token')){
      getNotes()
    } else {
      navigate('/login')
    }
    // eslint-disable-next-line
  }, []);
  
  const ref = useRef(null);
  const refClose = useRef(null);
  const [note, setNote] = useState({id: "", etitle: "", edescription: "", etag: ""});

  const updateNote = (currentNote) => {
    ref.current.click();  
    setNote({id: currentNote._id, etitle: currentNote.title, edescription: currentNote.description, etag: currentNote.tag})
  }

  const handleClick = (e) => {
    e.preventDefault();
    editNote(note.id, note.etitle, note.edescription, note.etag)
    refClose.current.click();
    // addNote(note.title,note.description,note.tag)
    props.showAlert("Note Updated Successfully", "success");
  }

  const onChange = (e)=>{
      setNote({...note, [e.target.name]: e.target.value})
  }


  return (
    <>
      <button ref={ref} type="button" class="btn btn-primary d-none" data-bs-toggle="modal" data-bs-target="#exampleModal">
        Launch demo modal
      </button>
      <div class="modal fade" id="exampleModal" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
        <div class="modal-dialog">
          <div class="modal-content">
            <div class="modal-header">
              <h5 class="modal-title" id="exampleModalLabel">
                Edit Note
              </h5>
              <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"
              ></button>
            </div>
            <div class="modal-body">
            <form>
                <div class="mb-3">
                  <label for="etitle" class="form-label">
                    Title
                  </label>
                  <input type="text" class="form-control" id="etitle" aria-describedby="emailHelp" name='etitle' onChange={onChange} value={note.etitle}/>
                </div>
                <div class="mb-3">
                  <label for="edescription" class="form-label">
                  Description
                  </label>
                  <input type="text" class="form-control" id="edescription" name='edescription' onChange={onChange} value={note.edescription}/>
                </div>
                <div class="mb-3">
                  <label for="etag" class="form-label">
                  Tag
                  </label>
                  <input type="text" class="form-control" id="etag" name='etag' onChange={onChange} value={note.etag}/>
                </div>
              </form>
            </div>
            <div class="modal-footer">
              <button ref={refClose} type="button" class="btn btn-secondary" data-bs-dismiss="modal">
                Close
              </button>
              <button type="button" class="btn btn-primary" onClick={handleClick} disabled={note.etitle.length < 5 || note.edescription.length < 5}>
                Update Note
              </button>
            </div>
          </div>
        </div>
      </div>
      <AddNote showAlert={props.showAlert}/>
      <div className="row">
        {notes.map((note) => {
          return <NoteItem key={note._id} note={note} updateNote={updateNote} showAlert={props.showAlert}/>
        })}
      </div>
    </>
  )
}

export default Notes
