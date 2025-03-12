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

app.get("/daily_log", (req, res) => {
    const q = "SELECT * FROM daily_log";
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

app.post("/daily_log", (req, res) => {
    const q = "INSERT INTO daily_log (tired, sick, high_temperature, exercise, headache, chestpain, trouble_breathing) VALUES (?, ?, ?, ?, ?, ?, ?)";

    const values = [
        parseInt(req.body.tired, 10),
        parseInt(req.body.sick, 10),
        parseInt(req.body.high_temperature, 10),
        parseInt(req.body.exercise, 10),
        parseInt(req.body.headache, 10),
        parseInt(req.body.chestpain, 10),
        parseInt(req.body.trouble_breathing, 10)
    ];
    
    db.query(q, values, (err, data) => {
        if (err) {
            console.error("Database Error:", err);
            return res.status(500).json(err);
        }
        return res.json("Successfully logged");
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