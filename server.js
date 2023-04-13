// imports express, path and routes index.js
const express = require('express');
const path = require('path');
const api = require('./routes/index.js');

const PORT = process.env.PORT || 3001;


const app = express();


app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use('/api', api);

app.use(express.static('public'));



// sends notes.html to request path notes
app.get('/notes', (req, res) =>
  res.sendFile(path.join(__dirname, '/public/notes.html'))
);
// Sends the index.html to all request paths besides notes
app.get('*', (req, res) =>
  res.sendFile(path.join(__dirname, '/public/index.html'))
);
// Starts applications server
app.listen(PORT, () =>
  console.log(`App listening at http://localhost:${PORT} 🚀`)
);
