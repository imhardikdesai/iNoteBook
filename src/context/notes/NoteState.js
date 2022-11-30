import NoteContext from "./noteContext";
import { useState } from "react";
const host = 'http://localhost:5000';

const NoteState = (props) => {
    const noteInitial = [];
    const [notes, setNotes] = useState(noteInitial);

    // Fetch All Notes 
    const fetchedNote = async () => {
        const response = await fetch(`${host}/api/note/fetchnote`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'auth-token': 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiNjM4MjA4YzlhY2IzZTM5OWE5NGVkMjA5In0sImlhdCI6MTY2OTUyODc1MH0.2MwcuNkNMnFrkx13FasH-eMGz2H9agvRyFI01GUFu0Y'
            }
        });
        const json = await response.json();
        console.log(json);
        setNotes(json);
    }


    // Add note 
    const addNote = async (title, description, tag) => {

        // API call 
        const response = await fetch(`${host}/api/note/addnote`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'auth-token': 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiNjM4MjA4YzlhY2IzZTM5OWE5NGVkMjA5In0sImlhdCI6MTY2OTUyODc1MH0.2MwcuNkNMnFrkx13FasH-eMGz2H9agvRyFI01GUFu0Y'
            },
            body: JSON.stringify({ title, description, tag })
        });
        const json = response.json()
        console.log(json);
        fetchedNote()
    }
    // Delete Note 
    const deleteNote = async (id) => {
        const response = await fetch(`${host}/api/note/deletenote/${id}`, {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json',
                'auth-token': 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiNjM4MjA4YzlhY2IzZTM5OWE5NGVkMjA5In0sImlhdCI6MTY2OTUyODc1MH0.2MwcuNkNMnFrkx13FasH-eMGz2H9agvRyFI01GUFu0Y'
            }
        });
        const json = await response.json()
        console.log(json);
        const newNotes = notes.filter((notes) => { return notes._id !== id })
        // console.log(newNotes);
        setNotes(newNotes);
    }
    // Edit note 
    const editNote = async (id, title, description, tag) => {

        const response = await fetch(`${host}/api/note/updatenote/${id}`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'auth-token': 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiNjM4MjA4YzlhY2IzZTM5OWE5NGVkMjA5In0sImlhdCI6MTY2OTUyODc1MH0.2MwcuNkNMnFrkx13FasH-eMGz2H9agvRyFI01GUFu0Y'
            },
            body: JSON.stringify({ title, description, tag })
        });

        const json = await response.json();
        console.log(json);
        // for (let i = 0; i < notes.length; i++) {
        //     const element = notes[i];
        //     if (element._id === id) {
        //         element.title = title;
        //         element.description = description;
        //         element.tag = tag;
        //     }
        // }
    }

    return (
        <NoteContext.Provider value={{ notes, addNote, deleteNote, editNote, fetchedNote }}>
            {props.children}
        </NoteContext.Provider>
    )
}

export default NoteState
