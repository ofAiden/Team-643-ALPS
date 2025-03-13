import express from "express";
import mysql from "mysql";
import cors from 'cors';
import dotenv from 'dotenv';
dotenv.config();

const app = express();

const db = mysql.createConnection({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASS,
    database: process.env.DB_NAME
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
    const q = "INSERT INTO notes (type, content) VALUES (?)";
    const values = [
        req.body.type,
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
    const { tired, sick, high_temperature, exercise, headache, chestpain, trouble_breathing } = req.body;

    const query = "INSERT INTO daily_log (tired, sick, high_temperature, exercise, headache, chestpain, trouble_breathing) VALUES (?, ?, ?, ?, ?, ?, ?)";
    const values = [tired, sick, high_temperature, exercise, headache, chestpain, trouble_breathing];

    db.query(query, values, (err, result) => {
        if (err) {
            console.error("Error inserting log:", err);
            return res.status(500).json({ error: "Database error" });
        }
        res.status(200).json({ message: "Log added successfully", logId: result.insertId });
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
    const q = "UPDATE notes SET type = ?, content = ? WHERE id = ?";
    const values = [
        req.body.type,
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