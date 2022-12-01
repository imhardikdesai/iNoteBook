import React, { useContext, useEffect, useRef, useState } from 'react'
import noteContext from '../context/notes/noteContext';
import AddNote from './AddNote';
import NoteItem from './NoteItem';

const Notes = () => {

    const context = useContext(noteContext)
    const { notes, fetchedNote, editNote } = context;
    const [currentNote, setCurrentNote] = useState({ id: '', etitle: '', edescription: '', etag: '' })

    useEffect(() => {
        fetchedNote()
        // eslint-disable-next-line
    }, [])

    const ref = useRef(null)
    const closeRef = useRef(null)

    const updateNote = (newNote) => {
        ref.current.click()
        setCurrentNote({ id: newNote._id, etitle: newNote.title, edescription: newNote.description, etag: newNote.tag })
    }


    const onChangeData = (e) => {
        setCurrentNote({ ...currentNote, [e.target.name]: e.target.value })
    }

    const handleAddNote = () => {
        ref.current.click()
        editNote(currentNote.id, currentNote.etitle, currentNote.edescription, currentNote.etag)
    }

    return (
        <>
            <AddNote />
            <button type="button" className="btn btn-primary d-none" ref={ref} data-bs-toggle="modal" data-bs-target="#exampleModal">
                Launch demo modal
            </button>
            <hr />
            <div className="modal fade" id="exampleModal" tabIndex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
                <div className="modal-dialog">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h1 className="modal-title fs-5" id="exampleModalLabel">Edit Note</h1>
                            <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                        </div>
                        <div className="modal-body">
                            <form>
                                <div className="mb-3">
                                    <label htmlFor="etitle" className="form-label">Title</label>
                                    <input onChange={onChangeData} type="text" className="form-control" value={currentNote.etitle} id="etitle" name='etitle' aria-describedby="emailHelp" />
                                </div>
                                <div className="mb-3">
                                    <label htmlFor="edescription" className="form-label">Description</label>
                                    <input onChange={onChangeData} type="text" className="form-control" value={currentNote.edescription} id="edescription" name='edescription' />
                                </div>
                                <div className="mb-3">
                                    <label htmlFor="etag" className="form-label">Tag</label>
                                    <input onChange={onChangeData} type="text" className="form-control" value={currentNote.etag} id="etag" name='etag' />
                                </div>

                            </form>
                        </div>
                        <div className="modal-footer">
                            <button ref={closeRef} type="button" className="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                            <button onClick={handleAddNote} type="button" className="btn btn-primary">Update Note</button>
                        </div>
                    </div>
                </div>
            </div>

            <div className="row my-3">
                <h2>Your Note</h2>
                {
                    notes.map((note) => {
                        return <NoteItem updateNote={updateNote} key={note._id} note={note} />
                    })
                }
            </div>
        </>
    )
}

export default Notes
