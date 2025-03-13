import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import Tiredness from "../Tiredness";
import Checkbox from "../Checkbox";

/*const DailyLog = () => {
    // State to hold daily logs
    const [logs, setLogs] = useState([]);

    useEffect(() => {
        const fetchDailyLogs = async () => {
            try {
                const res = await axios.get("http://localhost:8800/daily_log");
                console.log("Backend Response:", res.data);
                if (Array.isArray(res.data)) {
                    setLogs(res.data);
                } else {
                    console.log("Unexpected response data:", res.data);
                }
            } catch (err) {
                console.log("Error fetching logs:", err);
            }
        };

        fetchDailyLogs();
    }, []);

    const handleDelete = async (id) => {
        try {
            await axios.delete(`http://localhost:8800/daily_log/${id}`);
            setLogs(logs.filter((log) => log.id !== id));
*/

const DailyLog = () => {
    // Note Logging
    const [notes, setNotes] = useState([]);

    useEffect(() => {
        const fetchAllNotes = async () => {
            try {
                const res = await axios.get("http://localhost:8800/notes");
                console.log('Backend Response:', res.data);  // Log the response data
                if (Array.isArray(res.data)) {
                    setNotes(res.data);  // Set notes only if it's an array
                } else {
                    console.log("Unexpected response data:", res.data);  // If it's not an array, log it
                }
            } catch (err) {
                console.log("Error fetching notes:", err);
            }
        };
    
        fetchAllNotes();
    }, []);
    
    const handleDelete = async (id) => {
        try {
            await axios.delete(`http://localhost:8800/notes/${id}`);
            setNotes(notes.filter((note) => note.id !== id));
        } catch (err) {
            console.log(err);
        }
    };

    /*return (
        <div>
            <h1>Daily Log</h1>
            {logs.map((log) => (
                <div className="log-entry" key={log.id}>
                    <p><strong>Tired:</strong> {log.tired ? "Yes" : "No"}</p>
                    <p><strong>Sick:</strong> {log.sick ? "Yes" : "No"}</p>
                    <p><strong>High Temperature:</strong> {log.high_temperature ? "Yes" : "No"}</p>
                    <p><strong>Exercise:</strong> {log.exercise ? "Yes" : "No"}</p>
                    <p><strong>Headache:</strong> {log.headache ? "Yes" : "No"}</p>
                    <p><strong>Chest Pain:</strong> {log.chestpain ? "Yes" : "No"}</p>
                    <p><strong>Trouble Breathing:</strong> {log.trouble_breathing ? "Yes" : "No"}</p>
                    <button className="delete" onClick={() => handleDelete(log.id)}>Delete</button>
                    <Link to={`/update/${log.id}`}>
                        <button className="update">Update</button>
                    </Link>
                </div>
            ))}
        </div>
    );
    */

    // Boolean (checkbox) inputs}
    const [checkboxes, setCheckboxes] = useState({
        sick: false,
        highTemp: false,
        exercise: false,
        headache: false,
        troubleBreathing: false
    });
    const handleCheckboxChange = (name, value) => {
        setCheckboxes(prev => ({...prev, [name]: value}));
    };

    const handleSubmit = async e =>{
        e.preventDefault();

        const dailyLogData = {
            tired: checkboxes.tired,
            sick: checkboxes.sick,
            high_temperature: checkboxes.highTemp,
            exercise: checkboxes.exercise,
            headache: checkboxes.headache,
            troubleBreathing: checkboxes.troubleBreathing
        };

        try{
            await axios.post("http://localhost:8800/", dailyLogData);
            console.log("daily log data submtited:", dailyLogData);
        } catch (err) {
            console.error("error submitting daily log: ", err)
        }
    };

    return (
        <div>
            <div>
                <h2>Record a note</h2>
                {notes.map((note) => (
                    <div className="note" key={note.id}>
                        <p>{note.content}</p>
                        <button className="delete" onClick={() => handleDelete(note.id)}>Delete</button>
                        <button className="update">
                            <Link to={`/update/${note.id}`}>Update</Link>
                        </button>
                    </div>
                ))}
                <button>
                    <Link to="/add">Add new entry</Link>
                </button>
            </div>

            {/*what is this div below for*/}
            <div>
                <h1>Daily_Log</h1>
                {notes.map((note) => (
                    <div className="log-entry" key={note.id}>
                        <p><strong>Tired:</strong> {note.tired ? "Yes" : "No"}</p>
                        <p><strong>Sick:</strong> {note.sick ? "Yes" : "No"}</p>
                        <p><strong>High Temperature:</strong> {note.high_temperature ? "Yes" : "No"}</p>
                        <p><strong>Exercise:</strong> {note.exercise ? "Yes" : "No"}</p>
                        <p><strong>Headache:</strong> {note.headache ? "Yes" : "No"}</p>
                        <p><strong>Chest Pain:</strong> {note.chestpain ? "Yes" : "No"}</p>
                        <p><strong>Trouble Breathing:</strong> {note.trouble_breathing ? "Yes" : "No"}</p>
                        <button className="delete" onClick={() => handleDelete(note.id)}>Delete</button>
                        <Link to={`/update/${note.id}`}>
                            <button className="update">Update</button>
                        </Link>
                    </div>
                ))}
            </div>

            <div>
                <h1>Daily Log</h1>
                <Tiredness />
                <Checkbox 
                    label="Sick" 
                    checked={checkboxes.sick} 
                    onChange={(val) => handleCheckboxChange("sick", val)}
                />
                <Checkbox 
                    label="High Temperature" 
                    checked={checkboxes.highTemp} 
                    onChange={(val) => handleCheckboxChange("highTemp", val)}
                />
                <Checkbox 
                    label="Exercise" 
                    checked={checkboxes.exercise} 
                    onChange={(val) => handleCheckboxChange("exercise", val)}
                />
                <Checkbox 
                    label="Headache" 
                    checked={checkboxes.headache} 
                    onChange={(val) => handleCheckboxChange("headache", val)}
                />
                <Checkbox 
                    label="Trouble Breathing" 
                    checked={checkboxes.troubleBreathing} 
                    onChange={(val) => handleCheckboxChange("troubleBreathing", val)}
                />
                <button onClick={handleSubmit}>Submit Daily Log</button>
            </div>
        </div>
    );
};

export default DailyLog;