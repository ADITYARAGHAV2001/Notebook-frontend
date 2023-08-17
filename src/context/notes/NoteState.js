import { useState } from "react"
import NoteContext from "./noteContext"
const NoteState = (props) => {
    const host = "https://notebook-backend-ydvu.onrender.com/"
    const notesInitial = []
    const [notes, setNotes] = useState(notesInitial)


    // GET all notes
    const getNotes = async () => {
        // API CALL
        const response = await fetch(`${host}/api/notes/fetchallnotes`, {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
                "auth-token": localStorage.getItem('token')
            },
        });
        const json = await response.json();
        console.log(json);
        setNotes(json);
    }


    // ADD a note
    const addNote = async (title, description, tag) => {
        // API CALL
        const response = await fetch(`${host}/api/notes/addnote`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "auth-token": localStorage.getItem('token')
            },
            body: JSON.stringify({ title, description, tag }),
        });

        const note = await response.json();
        setNotes(notes.concat(note))
    }

    // DELETE a note
    const deleteNote = async (id) => {
        // API CALL
        const response = await fetch(`${host}/api/notes/deletenote/${id}`, {
            method: "DELETE",
            headers: {
                "Content-Type": "application/json",
                "auth-token": localStorage.getItem('token')
            },
        });
        const json = await response.json();
        console.log(json);


        console.log(id);
        const newNotes = notes.filter((note) => { return note._id !== id })
        setNotes(newNotes);
    }
    // Edit a note
    const editNote = async (id, title, description, tag) => {
        // API CALL
        const response = await fetch(`${host}/api/notes/updatenote/${id}`, {
            method: "PUT",
            headers: {
                "Content-Type": "application/json",
                "auth-token": localStorage.getItem('token')
            },
            body: JSON.stringify({ title, description, tag }),
        });

        const json = await response.json();
        console.log(json);
        let newNotes = JSON.parse(JSON.stringify(notes))
        // for (let index = 0; index < newNotes.length; index++) {
        //     const element = newNotes[index];

        //     if (element._id === id) {
        //         newNotes[index].title = title;
        //         newNotes[index].description = description;
        //         newNotes[index].tag = tag;
        //         break;
        //     }
        // }

        const noteIndex = newNotes.findIndex(note => note._id === id);
        if (noteIndex !== -1) {
            newNotes[noteIndex].title = title;
            newNotes[noteIndex].description = description;
            newNotes[noteIndex].tag = tag;
        }

        setNotes(newNotes);
    }
    return (
        <NoteContext.Provider value={{ notes, addNote, deleteNote, editNote, getNotes }}>
            {props.children}
        </NoteContext.Provider>

    )
}

export default NoteState;


// const response = await fetch(url, {
//     method: "POST",.
//    headers: {
//       "Content-Type": "application/json",
//    },
//     body: JSON.stringify(data),
//   });
//   return response.json(); 
