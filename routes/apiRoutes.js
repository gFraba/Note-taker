//api routes
const fs = require('fs');

module.exports = function (app) {
    
    // get existing notes if any are stored in json
    app.get("/api/notes", function (req, res) {
        fs.readFile("db/db.json", "utf8", (err, data) => {
            if (err) throw err;
            let notes = JSON.parse(data);
            res.json(notes);
        });
        
    });

    // post new notes to json
    app.post("/api/notes", function (req, res) {
        fs.readFile("db/db.json", "utf8", (err, data) => {
            if (err) throw err;

            let notes = JSON.parse(data);

            let newNote = req.body;
            let uniqueId = (notes.length).toString();
            newNote.id = uniqueId;
            console.log(newNote);
            notes.push(newNote);

            fs.writeFileSync("db/db.json", JSON.stringify(notes), "utf8", (err, data) => {
                if (err) throw err;
                });
            console.log("New note added");
            res.json(notes);
        });
    });

    // delete existing note
    app.delete("/api/notes/:id", function (req, res) {
        fs.readFile("db/db.json", "utf8", (err, data) => {
            if (err) throw err;

            let notes = JSON.parse(data);
            let notesId = req.params.id;
            let newNotesId = 0;

            notes = notes.filter(currNote => {
                return currNote.id != notesId;
            });

            for (currNote of notes) {
                currNote.id = newNotesId.toString();
                newNotesId++;
            };

            fs.writeFileSync("db/db.json", JSON.stringify(notes), "utf8", (err, data) => {
                if (err) throw err;
                });
            console.log("Note deleted");
            res.json(notes);
        });
    });
};