import React from 'react'
import { useState, useContext} from 'react'
import noteContext from '../context/notes/noteContext';

const AddNote = (props) => {
    const a = useContext(noteContext)
    const {addNote} = a;

    const [note, setNote] = useState({title: "", description: "", tag: ""});

    const onChange = (e)=>{
        setNote({...note, [e.target.name]: e.target.value})
    }

    const handleClick = (e) => {
      e.preventDefault();
      addNote(note.title,note.description,note.tag)
      props.showAlert("Note added successfully", "success")
      setNote({title: "", description: "", tag: ""})
    }
  return (
    <>
      <form>
        <div class="mb-3">
          <label for="title" class="form-label">
            Title
          </label>
          <input type="text" class="form-control" id="title" aria-describedby="emailHelp" name='title' onChange={onChange} value={note.title}/>
        </div>
        <div class="mb-3">
          <label for="description" class="form-label">
          Description
          </label>
          <input type="text" class="form-control" id="description" name='description' onChange={onChange} value={note.description}/>
        </div>
        <div class="mb-3">
          <label for="tag" class="form-label">
          Tag
          </label>
          <input type="text" class="form-control" id="tag" name='tag' onChange={onChange} value={note.tag}/>
        </div>
        <button disabled={note.title.length < 5 || note.description.length < 5} type="submit" class="btn btn-primary" onClick={handleClick} >
          Submit
        </button>
      </form>
    </>
  )
}

export default AddNote
