import express from "express";
import mysql from "mysql";
import cors from 'cors';

const app = express();

const db = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "Aiden.0413",
    database: "notes_app"
});

app.use(express.json());
app.use(cors());

app.get("/", (req, res) => {
    res.send("Backend is running!");
});

// Get all notes
app.get("/notes", (req, res) => {
    const q = "SELECT * FROM notes";
    db.query(q, (err, data) => {
        if (err) return res.json(err);
        return res.json(data);
    });
});

// Create a new note
app.post("/notes", (req, res) => {
    const q = "INSERT INTO notes (title, content) VALUES (?)";
    const values = [
        req.body.title,
        req.body.content,
    ];
    
    db.query(q, [values], (err, data) => {
        console.log("Note has been sent to database");
        console.log(err);
        if (err) return res.json(err);
        return res.json("Note has been created successfully");
    });
});

// Delete a note
app.delete("/notes/:id", (req, res) => {
    const noteId = req.params.id;
    const q = "DELETE FROM notes WHERE id = ?";

    db.query(q, [noteId], (err, data) => {
        if (err) return res.json(err);
        return res.json("Note has been deleted successfully.");
    });
});

// Update a note
app.put("/notes/:id", (req, res) => {
    const noteId = req.params.id;
    const q = "UPDATE notes SET title = ?, content = ? WHERE id = ?";
    const values = [
        req.body.title,
        req.body.content,
    ];

    db.query(q, [...values, noteId], (err, data) => {
        if (err) return res.json(err);
        return res.json("Note has been updated successfully.");
    });
});

// Start the server on port 8800
app.listen(8800, () => {
    console.log("listening on http://localhost:8800");
});