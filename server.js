const express = require('express');
const PORT = process.env.PORT || 3002;
const fs = require('fs');
const path = require('path');
// const index = require('./public/assets/js/index');
const { notes } = require('./db/db.json');
const app = express();
const indexFunctions = require('./public/assets/js/index');

// Middleware from Express.js (app.use) for POST
//parse incoming data into key/value pairs
app.use(express.urlencoded({ extended: true }));
// parse incoming JSON data
app.use(express.json());

// access saved notes in db.json
app.get('/api/notes', (req, res) => {
    // set unique ID to each note saved
    req.body.id = notes.length.toString();

    // add the saved note to db.json
    const newNote = saveNote(req.body);

    res.json(newNote);
});

// GET index html
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, './public/index.html'));
});

// GET notes html
app.get('/notes', (req, res) => {
    res.sendFile(path.join(__dirname, './public/notes.html'));
});

// POST route to add new notes to db.json
app.post('/api/notes', (req, res) => {
    console.log(req.body);
    res.json(req.body);
});

app.use(express.static('public'));

// run the server
app.listen(PORT, () => {
    console.log(`Note-Taker API server is now on port ${PORT}!`);
});