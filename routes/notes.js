// imports notes route, helpers, and ID generator
const notes = require('express').Router();
const { readFromFile, writeToFile, readAndAppend } = require('../helpers/fsUtils');
const { v4: uuidv4 } = require('uuid');
// Get request that reads database and returns all the notes
notes.get('/', (req, res) => {
    readFromFile('./db/db.json').then((data) => res.json(JSON.parse(data)));
  });
// POST route that posts a note by reading the note database and rewriting it with new note added
notes.post('/', (req, res) => {
    console.log(req.body);
  
    const {title, text } = req.body;
  
    if (req.body) {
      const newNote = {
        title,
        text,
        note_id: uuidv4()
      };
  
      readAndAppend(newNote, './db/db.json');

      res.json(`Note added successfully 🚀`);
    } else {
      res.json('Error in adding note');
    }
  });
// DELETE request that deletes a note based on the note id that was passed through the parameter
  notes.delete('/:note_id', (req, res) => {
    const notesId = req.params.note_id;
    readFromFile('./db/db.json')
      .then((data) => JSON.parse(data))
      .then((json) => {
        
        const result = json.filter((note) => note.note_id !== notesId);
        
        writeToFile('./db/db.json', result);
  
        res.json(`Item ${notesId} has been deleted 🗑️`);
      });
  });
  
module.exports = notes;
