const express = require('express');
const PORT = process.env.PORT || 3002;
const app = express();
const fs = require('fs');
const path = require('path');
const { notes } = require('./db/db.json');

app.get('/api/notes', (req, res) => {
    res.json(notes);
});

// GET index html
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, './public/index.html'));
});

// GET notes html
app.get('/notes', (req, res) => {
    res.sendFile(path.join(__dirname, './public/notes.html'));
});

// run the server
app.listen(PORT, () => {
    console.log(`Note-Taker API server is now on port ${PORT}!`);
});