const notes = require('express').Router();
const { readFromFile, writeToFile, readAndAppend } = require('../helpers/fsUtils');
const { v4: uuidv4 } = require('uuid');

notes.get('/', (req, res) => {
    readFromFile('./db/db.json').then((data) => res.json(JSON.parse(data)));
  });
  
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

      const response = {
        status: 'success',
        body: newNote
      }
      res.json(`Note added successfully 🚀`);
    } else {
      res.json('Error in adding note');
    }
  });


  notes.delete('/:note_id', (req, res) => {
    const notesId = req.params.note_id;
    readFromFile('./db/db.json')
      .then((data) => JSON.parse(data))
      .then((json) => {
        // Make a new array of all tips except the one with the ID provided in the URL
        const result = json.filter((note) => note.note_id !== notesId);
        // Save that array to the filesystem
        writeToFile('./db/db.json', result);
  
        // Respond to the DELETE request
        res.json(`Item ${notesId} has been deleted 🗑️`);
      });
  });
  
  
  
module.exports = notes;

// changes Ive made 