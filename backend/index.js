// backend/index.js
import express from "express";
import mysql from "mysql";
import cors from "cors";
import dotenv from "dotenv";

dotenv.config({ path: "./.env" });

const app = express();

// Database connection
const db = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "Aiden.0413",
    database: "notes_app",
});

app.use(express.json());
app.use(cors());

// Connect to the database
db.connect((err) => {
    if (err) {
        console.error("Database connection failed:", err);
    } else {
        console.log("Connected to MySQL database.");
    }
});

// Root health check
app.get("/", (req, res) => {
    res.send("Backend is running!");
});

// Daily log routes
app.get("/daily_log", (req, res) => {
    db.query("SELECT * FROM daily_log", (err, data) => {
        if (err) return res.status(500).json({ error: err.message });
        return res.json(data);
    });
});

app.post("/daily_log", (req, res) => {
    const { date, tired, sick, high_temperature, exercise, headache, chestpain, trouble_breathing } = req.body;

    if ([date, tired, sick, high_temperature, exercise, headache, chestpain, trouble_breathing].includes(undefined)) {
        return res.status(400).json({ error: "Missing required fields" });
    }

    const query = `
        INSERT INTO daily_log (date, tired, sick, high_temperature, exercise, headache, chestpain, trouble_breathing)
        VALUES (?, ?, ?, ?, ?, ?, ?, ?)
        ON DUPLICATE KEY UPDATE
            tired=VALUES(tired),
            sick=VALUES(sick),
            high_temperature=VALUES(high_temperature),
            exercise=VALUES(exercise),
            headache=VALUES(headache),
            chestpain=VALUES(chestpain),
            trouble_breathing=VALUES(trouble_breathing);
    `;
    const values = [date, tired, sick, high_temperature, exercise, headache, chestpain, trouble_breathing];

    db.query(query, values, (err, result) => {
        if (err) return res.status(500).json({ error: "Database error" });
        res.status(200).json({ message: "Daily Log added successfully", logId: result.insertId });
    });
});

// Medicine routes
app.get("/medicine", (req, res) => {
    db.query("SELECT * FROM medicine", (err, data) => {
        if (err) return res.status(500).json({ error: "Database error" });
        return res.json(data);
    });
});

app.post("/medicine", (req, res) => {
    const { medicine, dosage, unit, active, date } = req.body;

    if (typeof medicine !== 'string' || medicine.trim() === '' ||
        typeof dosage !== 'number' ||
        typeof unit !== 'string' || unit.trim() === '' ||
        typeof active !== 'boolean' ||
        typeof date !== 'string' || !/^\d{4}-\d{2}-\d{2}$/.test(date)) {
        return res.status(400).json({ error: "Invalid input values" });
    }

    const query = `
        INSERT INTO medicine (medicine, dosage, unit, active, date)
        VALUES (?, ?, ?, ?, ?)
        ON DUPLICATE KEY UPDATE
            dosage = VALUES(dosage),
            unit = VALUES(unit),
            active = VALUES(active),
            date = VALUES(date);
    `;
    const values = [medicine.trim(), dosage, unit.trim(), active, date];

    db.query(query, values, (err, result) => {
        if (err) return res.status(500).json({ error: "Database error" });
        res.status(200).json({ message: "Medicine added/updated successfully", medicineId: result.insertId });
    });
});


// Medicine name routes
app.get("/medicinename", (req, res) => {
    db.query("SELECT * FROM medicinename", (err, data) => {
        if (err) return res.status(500).json({ error: "Database error" });
        return res.json(data);
    });
});

app.post("/medicinename", (req, res) => {
    const { medicine } = req.body;

    if (typeof medicine !== 'string' || medicine.trim() === '') {
        return res.status(400).json({ message: "Invalid or empty medicine name" });
    }

    const query = `
        INSERT INTO medicinename (medicine)
        VALUES (?)
        ON DUPLICATE KEY UPDATE medicine = VALUES(medicine);
    `;
    const values = [medicine.trim()];

    db.query(query, values, (err, result) => {
        if (err) return res.status(500).json({ error: "Database error" });
        res.status(200).json({ message: "Medicine name added/updated successfully", id: result.insertId });
    });
});

// Notes routes
app.get("/notes", (req, res) => {
    db.query("SELECT * FROM notes", (err, data) => {
        if (err) return res.status(500).json({ error: "Database error" });
        return res.json(data);
    });
});

app.post("/notes", (req, res) => {
    const { date, type, content } = req.body;
    const q = "INSERT INTO notes (date, type, content) VALUES (?, ?, ?)";
    db.query(q, [date, type, content], (err, data) => {
        if (err) return res.status(500).json({ error: "Database error" });
        return res.status(200).json({ message: "Note has been created successfully" });
    });
});

app.delete("/notes/:id", (req, res) => {
    const noteId = req.params.id;
    db.query("DELETE FROM notes WHERE id = ?", [noteId], (err, data) => {
        if (err) return res.status(500).json({ error: "Database error" });
        return res.status(200).json({ message: "Note has been deleted successfully." });
    });
});

app.put("/notes/:id", (req, res) => {
    const noteId = req.params.id;
    const { date, type, content } = req.body;
    console.log("updating/adding note with:", req.body)
    const q = "UPDATE notes SET date = ?, type = ?, content = ? WHERE id = ?";
    db.query(q, [date, type, content, noteId], (err, data) => {
        if (err) {
            console.log("Error in adding/updating note:", err);
            return res.status(500).json({ error: "Database error" });
        }
        return res.status(200).json({ message: "Note has been updated successfully." });
    });
});

// Start server
app.listen(8800, () => {
    console.log("Backend running on http://localhost:8800");
});