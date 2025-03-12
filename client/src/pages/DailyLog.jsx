import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom"; // ✅ Import Link
import Tiredness from "../Tiredness";
import Checkbox from "../Checkbox";

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

    // Boolean (checkbox) inputs
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
        //not sure how to do this here
        //want to send all daily log stats to database
    }

    return (
        <div>
            <h2>Record a note</h2>
            {notes.map((note) => ( // Moved key inside .map()
                <div className="note" key={note.id}>
                    <h2>{note.title}</h2>
                    <p>{note.content}</p>
                    <button className="delete" onClick={() => handleDelete(note.id)}>Delete</button>
                    <button className="update">
                        <Link to={`/update/${note.id}`}>Update</Link> {/* ✅ Fixed template literal */}
                    </button>
                </div>
            ))}
            <button>
                <Link to="/add">Add new note</Link>
            </button>
            
            
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
            <button onClick = {handleSubmit}> Submit Daily Log </button>
            
        </div>
    );
};

export default DailyLog;