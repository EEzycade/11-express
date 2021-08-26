// import needed files and tools
const fs = require('fs');
const path = require('path');
const express = require('express');
const notes = require('./db/notes.json');
const generateUniqueId = require('generate-unique-id');

const PORT = process.env.PORT || 3001;
const app = express();

app.use(express.static('public'));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// html route to serve index.html
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, './public/index.html'));
});

// html route to serve notes.html
app.get('/notes', (req, res) => {
    res.sendFile(path.join(__dirname, './public/notes.html'));
});

// function to create a new note
function createNewNote(body, notes) {
    // define note
    const note = body;
    
    // push note to notes array in notes
    notes.notes.push(note);

    // adds the new note to notes.json
    fs.writeFileSync(
        path.join(__dirname, './db/notes.json'),
        JSON.stringify(notes)
    );
}

// api route to return the notes array inside of notes.json
app.get('/api/notes', (req, res) => {
    res.json(notes.notes);
});

// api route to post a new note
app.post('/api/notes', (req, res) => {
    // set id by using npm package "generate-unique-idea"
    req.body.id = generateUniqueId({
        length: 5
    });

    // create note by using createNewNote function with params req.body and notes
    const note = createNewNote(req.body, notes);
    
    res.json(note);
});

app.listen(PORT, () => {
    console.log(`API server now on port ${PORT}!`);
});