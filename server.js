const express = require('express');
const PORT = process.env.PORT || 3002;
const app = express();
const fs = require('fs');
const path = require('path');
const { db } = require('./Develop/db/db.json');

app.get('/api/db/', (req, res) => {
    res.send('Hi there!');
});

app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, './Develop/public/index.html'));
});

app.get('/notes', (req, res) => {
    res.sendFile(path.join(__dirname, './Develop/public/notes.html'));
});

app.listen(PORT, () => {
    console.log(`Note-Taker API server is now on port ${PORT}!`);
});