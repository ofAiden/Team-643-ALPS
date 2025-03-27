import express from "express";
import mysql from "mysql";
import cors from "cors";
import dotenv from "dotenv";
dotenv.config().parsed;

const app = express();

console.log("test");
console.log(process.env.REACT_APP_TEST);

// Database connection
const db = mysql.createConnection({
    host: 'localhost',     // Your MySQL host, 'localhost' if running locally
    user: 'root',          // Your MySQL username
    password: 'Aiden.0413',// Your MySQL password
    database: 'notes_app'  // Your MySQL database name
});

//run this in mysql if authentication error is encountered:
//ALTER USER 'root'@'localhost' IDENTIFIED WITH mysql_native_password BY 'password';

app.use(express.json()); //allows you to send any json file using a client
app.use(cors()); //prevent the issue of backend server preventing the application to use the backend api

// // Database connection
db.connect((err) => {
    if (err) {
        console.error("Database connection failed:", err);
    } else {
        console.log("Connected to MySQL database.");
    }
});

// Backend health check (when at "/" page of backend, gets request from user and sends response)
app.get("/", (req, res) => {
    res.send("Backend is running!");
});

// Get all logs
app.get("/daily_log", (req, res) => {
    const query = "SELECT * FROM daily_log";
    db.query(query, (err, data) => {
        if (err) return res.status(500).json({ error: err.message });
        return res.json(data); //if no error, returns data
    });
});

// Insert new daily log
app.post("/daily_log", (req, res) => {
    const { date, tired, sick, high_temperature, exercise, headache, chestpain, trouble_breathing } = req.body;
    // Validate the incoming data
    console.log("post1 from backend");

    if (
        date === undefined || tired === undefined || sick === undefined || high_temperature === undefined || 
        exercise === undefined || headache === undefined || chestpain === undefined || trouble_breathing === undefined
    ) {
        return res.status(400).json({ error: "Missing required fields" });
    }
    console.log("post 2 from backend");


    // Insert the daily log data into the database
    const query = 
    `
    INSERT INTO daily_log (date, tired, sick, high_temperature, exercise, headache, chestpain, trouble_breathing) 
    VALUES (?, ?, ?, ?, ?, ?, ?, ?) 
    ON DUPLICATE KEY UPDATE
        date=VALUES(date),
        tired=VALUES(tired), 
        sick=VALUES(sick), 
        high_temperature=VALUES(high_temperature),
        exercise=VALUES(exercise),
        headache=VALUES(headache),
        chestpain=VALUES(chestpain),
        trouble_breathing=VALUES(trouble_breathing);
    `;
    const values = [date, tired, sick, high_temperature, exercise, headache, chestpain, trouble_breathing];

    console.log("post before query backend", values);

    db.query(query, values, (err, result) => {
        if (err) {
            console.error("Error inserting daily log:", err);
            return res.status(500).json({ error: "Database error" });
        }
        res.status(200).json({ message: "Daily Log added successfully", logId: result.insertId });
    });
    console.log("post after query backend");

});

app.get("/notes", (req, res) => {
    const q = "SELECT * FROM notes";
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
//we need date here right
    ];

    db.query(q, [...values, noteId], (err, data) => {
        if (err) return res.json(err);
        return res.json("Note has been updated successfully.");
    });
});


// Start server on port 8800
app.listen(8800, () => {
    console.log("Backend running on http://localhost:8800");
});

