const express = require('express');
const fetchUser = require('../middleware/fetchUser');
const router = express.Router()
const Note = require('../models/Note');
const { body, validationResult } = require('express-validator');

//ROUTE : 1 Fetch All notes with GET request on localhost:5000/api/note/fetchnote 

router.get('/fetchnote', fetchUser, async (req, res) => {
    try {
        const note = await Note.find({ user: req.user.id });
        res.send(note);
    } catch (error) {
        console.error(error.message)
        res.status(500).send("Some Error Occurred")
    }
})

//ROUTE : 2 Add a Notes with POST request on localhost:5000/api/note/addnote 

router.post('/addnote', fetchUser, [
    body('title', "Enter Valid Title").isLength({ min: 3 }),
    body('description', "Enter Valid description").isLength({ min: 5 })
], async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }
    try {
        const { title, description, tag } = req.body

        const note = new Note({
            title, description, tag, user: req.user.id
        })
        const savedNote = await note.save()
        res.json(savedNote)

    } catch (error) {
        console.error(error.message)
        res.status(500).send("Some Error Occurred")
    }


})


//ROUTE : 3 Add a Notes with POST request on localhost:5000/api/note/addnote 

router.put('/updatenote/:id', fetchUser, async (req, res) => {
    const { title, description, tag } = req.body
    try {
        //Create a new Note object
        const newNote = {}
        if (title) { newNote.title = title }
        if (description) { newNote.description = description }
        if (tag) { newNote.tag = tag }

        let note = await Note.findById(req.params.id)
        if (!note) { return res.status(404).send("Not Found") }
        if (note.user.toString() !== req.user.id) {
            return res.status(401).send("Access Denied")
        }

        note = await Note.findByIdAndUpdate(req.params.id, { $set: newNote }, { new: true })
        res.json(note)

    } catch (error) {
        console.error(error.message)
        res.status(500).send("Some Error Occurred")
    }


})

//ROUTE : 4 Delete and existing Notes with DELETE request on localhost:5000/api/note/deletenote 

router.delete('/deletenote/:id', fetchUser, async (req, res) => {
    try {
        let note = await Note.findById(req.params.id)
        if (!note) { return res.status(404).send("Not Found") }

        if (note.user.toString() !== req.user.id) {
            return res.status(401).send("Access Denied")
        }

        note = await Note.findByIdAndDelete(req.params.id)
        res.json({ "Success": "Note Deleted Successfully", note: note })

    } catch (error) {
        console.error(error.message)
        res.status(500).send("Some Error Occurred")
    }


})



module.exports = router;