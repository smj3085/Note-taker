// Express.js

// Dependencies
const express = require('express');
const path = require('path');
const fs = require('fs');
const util = require('util');


// Sets up the Express App
const app = express();

// Sets up initial port
const PORT = process.env.PORT || 3000;

// Link to the assets folder
app.use(express.static('public'));

// Sets up the Express app to handle data parsing
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// Set variables 
const writefileAsync = util.promisify(fs.writeFile);
const readFileAsync = util.promisify(fs.readFile);
let allNotes;

//ROUTER 
app.get('/', (req, res) => res.sendFile(path.join(__dirname, './public/index.html')));

app.get('/notes', (req, res) => res.sendFile(path.join(__dirname, './public/notes.html')));

app.get('*', (req, res) => res.sendFile(path.join)(__dirname, '/public/index.html'));


// GET and POST API Endpoints
// Get notes list
app.get('/api/notes', (req, res) => res.json(database));

// Add a new note to the json db file
app.post('/api/notes', (req, res) => {
  const jsonFilePath = path.join(__dirname, '/db/db.json');
  const newNote = req.body;

   // This allows the test note to be the original note.
   let highestId = 99;
   // This loops through the array and finds the highest ID.
   for (let i = 0; i < database.length; i++) {
       let individualNote = database[i];

       if (individualNote.id > highestId) {
           // highestId will always be the highest numbered id in the notesArray.
           highestId = individualNote.id;
       }
   }
    // This assigns an ID to the newNote. 
    newNote.id = highestId + 1;

    database.push(newNote);
  // })

  writefileAsync(jsonFilePath, JSON.stringify(database), (err) => {
    if(err) {
      console.log(err)
    }
    console.log("Your note was saved");
  });
  res.json(newNote);
});

// LISTENER
// The below code effectively "starts" our server

app.listen(PORT, () => {
  console.log(`App listening on PORT: ${PORT}`);
});