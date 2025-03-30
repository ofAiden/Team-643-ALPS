import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const AddMemo = () => {
    const [note, setNote] = useState({
        date: new Date().toLocaleDateString("en-CA", {timeZone: "America/Los_Angeles"}), //en-CA indicates Canada, which uses YYYY-MM-DD format
        type: "Quick Note", // Default type
        content: ""
    });

    const navigate = useNavigate();

    // Handle changes for date field
    const handleDateChange = (e) => {
        setNote(prev => ({ ...prev, date: e.target.value}));
    }

    // Handle changes for content field
    const handleChange = (e) => {
        setNote(prev => ({ ...prev, [e.target.name]: e.target.value }));
    };

    const handleNoteSubmit = async (e) => {
        e.preventDefault();
        try {
            await axios.post("http://localhost:8800/notes", note);
            navigate("/");
        } catch (err) {
            console.log(err);
        }
    };

    console.log(note);
    
    return (
        <div className="form">
            <h1>Add New Note</h1>
            
            <form onSubmit={handleNoteSubmit}>
                {/* Input for Selecting Date */}
                <input type="date" value={note.date} onChange = {handleDateChange}/>

                {/* Dropdown for selecting type */}
                <label>Type:</label>
                <select name="type" onChange={handleChange} value={note.type}>
                    <option value="Quick Note">Quick Note</option>
                    <option value="Doctor Question">Doctor Question</option>
                    <option value="Medicine">Medicine</option>
                </select>

                {/* Text input for content */}
                <input
                    type="text"
                    placeholder="Content"
                    onChange={handleChange}
                    name="content"
                    value={note.content}
                />

                <button type="submit">Add Note</button>
            </form>

        </div>
    );
};

export default AddMemo;