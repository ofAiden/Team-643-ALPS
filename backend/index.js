import express from "express";
import mysql from "mysql";
import cors from "cors";
import dotenv from "dotenv";
dotenv.config({ path: "./.env" });

const app = express();

const db = mysql.createConnection({
    host: 'localhost',     // Your MySQL host, 'localhost' if running locally
    user: 'root',          // Your MySQL username
    password: 'Aiden.0413',// Your MySQL password
    database: 'notes_app'  // Your MySQL database name
});

app.use(express.json());
app.use(cors());

// Database connection
db.connect((err) => {
    if (err) {
        console.error("Database connection failed:", err);
    } else {
        console.log("Connected to MySQL database.");
    }
});


// Backend health check
app.get("/", (req, res) => {
    res.send("Backend is running!");
});

// Get all logs
app.get("/daily_log", (req, res) => {
    const query = "SELECT * FROM daily_log";
    db.query(query, (err, data) => {
        if (err) return res.status(500).json({ error: err.message });
        return res.json(data);
    });
});

// Insert new daily log
app.post("/daily_log", (req, res) => {
    const { tired, sick, high_temperature, exercise, headache, chestpain, trouble_breathing } = req.body;

    // Validate the incoming data
    if (
        tired === undefined || sick === undefined || high_temperature === undefined || 
        exercise === undefined || headache === undefined || chestpain === undefined || trouble_breathing === undefined
    ) {
        return res.status(400).json({ error: "Missing required fields" });
    }

    // Insert the data into the database
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

// Start server on port 8800
app.listen(8800, () => {
    console.log("Backend running on http://localhost:8800");
});

