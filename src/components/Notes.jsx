import React, { useContext } from 'react'
import noteContext from '../context/notes/noteContext';
import AddNote from './AddNote';
import NoteItem from './NoteItem';
import { useEffect } from 'react';

const Notes = () => {

    const context = useContext(noteContext)
    const { notes, fetchedNote } = context;

    useEffect(() => {
        fetchedNote()
        // eslint-disable-next-line
    }, [])

    return (
        <>
            <AddNote />
            <hr />
            <div className="row my-3">
                <h2>Your Note</h2>
                {
                    notes.map((note) => {
                        return <NoteItem key={note._id} note={note} />

                    })
                }
            </div>
        </>
    )
}

export default Notes
