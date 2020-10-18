const express = require('express');
const PORT = process.env.PORT || 3001;
const app = express();
const { notes } = require('./db/db.json');
const path = require('path');

const htmlRoutes = require('./routes/htmlRoutes/');
const apiRoutes = require('./routes/apiRoutes/notesRoutes');

//parse incoming data into key/value pairs
app.use(express.urlencoded({ extended: true }));

// parse incoming JSON data
app.use(express.json());

// access html routes
app.use('/', htmlRoutes);
// access api routes
app.use('/api', apiRoutes);

// access CSS and JS assets
app.use(express.static('public'));

// run the server
app.listen(PORT, () => {
    console.log(`Note-Taker API server is now on port ${PORT}!`);
});