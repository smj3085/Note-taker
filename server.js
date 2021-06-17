const express = require("express");
const fs = require("fs");
const path = require("path");
const uniqid = require("uniqid");

const PORT = process.env.PORT || 3001;

const app = express();
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static(path.join(__dirname, "public")));


// GET ALL notes

// const notesDB = path.join(__dirname, 'db', 'db.json');

app.get("/api/notes", (req, res) => {
  fs.readFile("./db/db.json", (err, data) => {
    if (err) throw err;
    res.json(JSON.parse(data));
  });
});

// POST new notes
app.post("/api/notes", (req, res) => {
    fs.readFile("./db/db.json", 'utf8', function (err, data) {
      if (err) throw err;
      data = JSON.parse(data)
      var newNote = {
        title: req.body.title.trim(),
        text: req.body.text.trim(),
        id: uniqid(),
      }
      var noteCombo = data.concat(newNote)
  
      fs.writeFile("./db/db.json", JSON.stringify(noteCombo, null, 2), function (err, data) {
        if (err) throw err;
        res.json(data);
      })
    })
})

//  Delete note
app.delete("/api/notes/:id", (req, res) => {
    const selectedNote = req.params.id;
    fs.readFile("./db/db.json", "utf8", (err, data) => {
          if (err) throw err;
          noteData = JSON.parse(data)
          const noteId = noteData.filter(i => i.id !== selectedNote)
          fs.writeFile("./db/db.json", JSON.stringify(noteId, null, 2), (err, data) => {
            if (err) throw err;
            res.json(data);
          })
    });
});



// HTML GET requests/// Basic route that sends the user first to the AJAX Page
app.get('/notes', (req, res) => {
    res.sendFile(path.join(__dirname, 'public/notes.html'));
});

app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'public/index.html'));
});

//   // If no matching route is found default to home
app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'index.html'), function (err) {
      if (err) throw err;
    });
});


app.listen(PORT, () => {
    console.log(`App Listening at PORT: ${PORT}`);
});