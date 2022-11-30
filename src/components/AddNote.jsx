import React from 'react'
import { useState } from 'react'
import { useContext } from 'react'
import noteContext from '../context/notes/noteContext'

const AddNote = () => {
    const [currentNote, setCurrentNote] = useState({ title: '', description: '', tag: 'default' })
    const context = useContext(noteContext)
    const { addNote } = context;

    const onChangeData = (e) => {
        setCurrentNote({ ...currentNote, [e.target.name]: e.target.value })
    }

    const handleAddNote = (e) => {
        e.preventDefault()
        addNote(currentNote.title, currentNote.description, currentNote.tag)
    }
    return (
        <>
            <div className="container my-2">
                <h2>Add Note</h2>
                <form>
                    <div className="mb-3">
                        <label htmlFor="title" className="form-label">Title</label>
                        <input onChange={onChangeData} type="text" className="form-control" id="title" name='title' aria-describedby="emailHelp" />
                    </div>
                    <div className="mb-3">
                        <label htmlFor="description" className="form-label">Description</label>
                        <input onChange={onChangeData} type="text" className="form-control" id="description" name='description' />
                    </div>
                    <div className="mb-3">
                        <label htmlFor="tag" className="form-label">Tag</label>
                        <input onChange={onChangeData} type="text" className="form-control" id="tag" name='tag' />
                    </div>
                    <button onClick={handleAddNote} type="submit" className="btn btn-primary">Add Note</button>
                </form>
            </div>

        </>
    )
}

export default AddNote
