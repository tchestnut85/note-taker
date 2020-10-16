const express = require('express');
const PORT = process.env.PORT || 3001;
const app = express();

const fs = require('fs');
const path = require('path');

const { notes } = require('./db/db.json');
// const { } = require('./public/assets/js/index');

// Middleware from Express.js (app.use) for POST
//parse incoming data into key/value pairs
app.use(express.urlencoded({ extended: true }));
// parse incoming JSON data
app.use(express.json());

// GET index.html
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, './public/index.html'));
});

// GET notes.html
app.get('/notes', (req, res) => {
    res.sendFile(path.join(__dirname, './public/notes.html'));
});

// GET route to return saved notes in db.json
app.get('/api/notes', (req, res) => {
    return res.json(notes);
});

// Get route to return specified note by parameter (ID)
app.get('/api/notes/:id', (res, req) => {
    const clickedNote = req.params.id;

    // loop through note's IDs and return note with matching ID
    for (let i = 0; i < notes.length; i++) {
        if (clickedNote === notes[i].id) {
            return res.json(notes[i])
        }
    }
    return res.send('This note was not found.')
})

// POST route to add new notes to db.json
app.post('/api/notes', (req, res) => {
    const newNote = req.body;

    // set unique ID to each note saved
    newNote.id = notes.length.toString();

    // log the new note
    console.log('\n New Note Added: ', newNote);

    // push new note onto the notes object
    notes.push(newNote);

    // NEW CODE - write new note to db.json
    fs.writeFileSync(
        path.join(__dirname, './db/db.json'),
        JSON.stringify({ notes }, null, 2)
    );
    // END NEW CODE

    // send response back to the client
    res.json(newNote);
});

// access CSS and JS assets
app.use(express.static('public'));

// run the server
app.listen(PORT, () => {
    console.log(`Note-Taker API server is now on port ${PORT}!`);
});