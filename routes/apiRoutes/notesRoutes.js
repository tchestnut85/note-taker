const router = require('express').Router();
const { notes } = require('../../db/db.json');
const fs = require('fs');
const path = require('path');
const { v4: uuidv4 } = require('uuid');

// GET route to return saved notes in db.json
router.get('/notes/', (req, res) => {
    res.json(notes);
});

// Get route to return specified note by parameter (ID)
router.get('/notes/:id', (res, req) => {
    const clickedNote = req.params.id;

    // loop through note's IDs and return note with matching ID
    for (let i = 0; i < notes.length; i++) {
        if (clickedNote === notes[i].id) {
            return res.json(notes[i])
        }
    }
    return res.send(404, 'This note was not found.')
})

// POST route to add new notes to db.json
router.post('/notes', (req, res) => {
    const newNote = req.body;

    // set unique ID to each note saved
    newNote.id = uuidv4();

    // log the new note
    console.log('\n New Note Added: ', newNote);

    // push new note onto the notes object
    notes.push(newNote);

    // save the updated notes object with newNote as db.json
    fs.writeFileSync(
        path.join(__dirname, '../../db/db.json'),
        JSON.stringify({ notes }, null, 2)
    );

    // send response back to the client
    res.json(newNote);
});

// DELETE request to remove a specific note by its unique ID
router.delete('/notes/:id', (req, res) => {
    const clickedNoteId = req.params.id;

    // delete the selected note
    for (let i = 0; i < notes.length; i++) {
        if (clickedNoteId === notes[i].id) {
            let noteIndex = notes.indexOf(notes[i]);
            notes.splice(noteIndex, 1);
        }
    }

    // save the updated notes object db.json
    fs.writeFileSync(
        path.join(__dirname, '../../db/db.json'),
        JSON.stringify({ notes }, null, 2)
    );

    res.send({ notes });
    console.log('\n Note Deleted!');
})

module.exports = router;