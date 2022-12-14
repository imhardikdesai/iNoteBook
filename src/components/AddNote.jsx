import React from 'react'
import { useState } from 'react'
import { useContext } from 'react'
import noteContext from '../context/notes/noteContext'

const AddNote = (props) => {
    const [currentNote, setCurrentNote] = useState({ title: '', description: '', tag: '' })
    const context = useContext(noteContext)
    const { addNote } = context;

    const onChangeData = (e) => {
        setCurrentNote({ ...currentNote, [e.target.name]: e.target.value })
    }

    const handleAddNote = (e) => {
        e.preventDefault()
        addNote(currentNote.title, currentNote.description, currentNote.tag)
        setCurrentNote({ title: '', description: '', tag: '' })
        props.showAlert('Note Added Successfully', 'success')
    }
    return (
        <>
            <div className="container my-2">
                <h2>Add Note</h2>
                <form>
                    <div className="mb-3">
                        <label htmlFor="title" className="form-label">Title</label>
                        <input onChange={onChangeData} type="text" value={currentNote.title} className="form-control" id="title" name='title' aria-describedby="emailHelp" />
                    </div>
                    <div className="mb-3">
                        <label htmlFor="description" className="form-label">Description</label>
                        <input onChange={onChangeData} type="text" value={currentNote.description} className="form-control" id="description" name='description' />
                    </div>
                    <div className="mb-3">
                        <label htmlFor="tag" className="form-label">Tag</label>
                        <input onChange={onChangeData} type="text" value={currentNote.tag} className="form-control" id="tag" name='tag' />
                    </div>
                    <button disabled={currentNote.title.length < 5 || currentNote.description.length < 5} onClick={handleAddNote} type="submit" className="btn btn-primary">Add Note</button>
                </form>
            </div>

        </>
    )
}

export default AddNote
