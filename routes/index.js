// imports
const express = require('express');

const notesRouter = require('./notes');

const app = express();

// routes to notes.js
app.use('/notes', notesRouter);

// export route
module.exports = app;