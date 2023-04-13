import NoteContext from "./noteContext";
import { useState } from "react";
import port from "../../port";
const NoteState = (props) => {
    const host = port
    const n = [];       
    const [notes, setNotes] = useState(n)
      
    // get all notes
    const getNotes = async () => {
      const response = await fetch(`${host}/api/notes/fatchallnotes`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          "auth-token": localStorage.getItem('token')
        }
      });
      console.log(response)
      const json = await response.json();
      console.log(json);
      setNotes(json)
    }

    // Add a Note
    const addNote = async (title, description, tag) =>{

      const response = await fetch(`${host}/api/notes/addnote`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          "auth-token": localStorage.getItem('token')
        },
        body: JSON.stringify({title,description,tag})
      });

      console.log("Adding a new note")
      const note = await response.json();
      setNotes(notes.concat(note))
    }  

    // Delete a Note
    const deleteNote = async (id) =>{
      const response = await fetch(`${host}/api/notes/deletenote/${id}`, {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
          "auth-token": localStorage.getItem('token')
        }
      });
      console.log(response)
      console.log("Delete Note " + id)
      const newNotes = notes.filter((note) => {return note._id !== id})
      setNotes(newNotes)
    }
    // Edit a Note    
    const editNote = async (id, title, description, tag) => {
      // API call
        const response = await fetch(`${host}/api/notes/updatenote/${id}`, {
          method: 'PUT',
          headers: {
            'Content-Type': 'application/json',
            "auth-token": localStorage.getItem('token')
          },
          body: JSON.stringify({title, description, tag})
        });
        const json = response.json();
        console.log(json)
        

      let newNote = JSON.parse(JSON.stringify(notes))
      // let newNote = notes;  // it is not work
      console.log(newNote);

      // logic to edit in client
      for (let index = 0; index < newNote.length; index++) {
        if(newNote[index]._id === id){
          newNote[index].title = title;
          newNote[index].description = description;
          newNote[index].tag = tag;
          break;
        } 
      }
      setNotes(newNote);
    }

    return (
        <NoteContext.Provider value={{notes,getNotes, addNote, deleteNote, editNote}}>
            {props.children}
        </NoteContext.Provider>
    )
}

export default NoteState;