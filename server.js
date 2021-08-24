const fs = require('fs');
const path = require('path');
const express = require('express');
const notes = require('./db/notes.json');
const generateUniqueId = require('generate-unique-id');

console.log(notes);

const PORT = process.env.PORT || 3001;
const app = express();

app.use(express.static('public'));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());


// app.get('*', (req, res) => {
//     res.sendFile(path.join(__dirname, './public/index.html'));
// });

app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, './public/notes.html'));
});





function createNewNote(body, notes) {
    const note = body;
    
    notes.push(note);
    fs.writeFileSync(
        path.join(__dirname, './db/notes.json'),
        JSON.stringify({ notes }, null, 2)
    );
    
}

app.get('/api/notes', (req, res) => {
    res.json(notes);
});


app.post('/api/notes', (req, res) => {
    // set id by using npm package "generate-unique-idea"
    req.body.id = generateUniqueId({
        length: 5
    });

    const note = createNewNote(req.body, notes);
    console.log(notes);
    res.json(note);

});




app.listen(PORT, () => {
    console.log(`API server now on port ${PORT}!`);
});