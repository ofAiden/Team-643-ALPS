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
    const query = `
        SELECT 
            m1.medicine, 
            m1.date AS startDate,
            -- If no matching end date found, use today's date as the endDate
            COALESCE(
                (SELECT MIN(m2.date) 
                 FROM medicine m2 
                 WHERE m2.medicine = m1.medicine 
                 AND m2.date > m1.date 
                 AND m2.active = 0), 
                CURDATE()  -- Default to today's date if no end date is found
            ) AS endDate
        FROM medicine m1
        WHERE m1.active = 1
        ORDER BY m1.medicine, m1.date;
    `;

    db.query(query, (err, results) => {
        if (err) return res.status(500).json({ error: "DB error" });
        return res.json(results);
    });
});


aapp.post("/medicine", (req, res) => {
    const { medicine, dosage, unit, active, date } = req.body;
    console.log('Received:', { medicine, dosage, unit, active, date });
  
    // validation (you can keep this)
    if (typeof medicine !== 'string' || medicine.trim() === '' ||
        typeof dosage !== 'number' ||
        typeof unit !== 'string' || unit.trim() === '' ||
        typeof active !== 'boolean' ||
        typeof date !== 'string' || !/^\d{4}-\d{2}-\d{2}$/.test(date)) {
      console.warn('Validation failed');
      return res.status(400).json({ error: "Invalid input values" });
    }
  
    // convert boolean → 0/1
    const activeValue = active ? 1 : 0;
  
    const query = `
      INSERT INTO medicine (medicine, dosage, unit, active, date)
      VALUES (?, ?, ?, ?, ?)
    `;
    const values = [medicine.trim(), dosage, unit.trim(), activeValue, date];
  
    db.query(query, values, (err, result) => {
      if (err) {
        console.error('SQL error inserting medicine:', err);
        return res.status(500).json({ error: "Database error", details: err.message });
      }
      res.status(200).json({
        message: "Medicine added successfully",
        medicineId: result.insertId
      });
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