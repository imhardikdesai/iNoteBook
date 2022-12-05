import React from 'react'
import { useContext } from 'react'
import noteContext from '../context/notes/noteContext'
const NoteItem = (props) => {
  const context = useContext(noteContext)
  const { deleteNote } = context;
  const { note, updateNote, showAlert } = props

  return (
    <>
      <div className="col-md-3">
        <div className="card my-3">
          <div className="card-body">
            <h5 className="card-title">{note.title}</h5>
            <p className="card-text">{note.description}</p>
            <div className="d-flex justify-content-between align-items-center">
              <i className="fa-solid fa-trash" onClick={() => { deleteNote(note._id); showAlert("Note Deleted Successfully", 'success') }}></i>
              <span className="badge text-bg-primary">{note.tag}</span>
              <i className="fa-solid fa-pen-to-square" onClick={() => { updateNote(note) }}></i>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

export default NoteItem
