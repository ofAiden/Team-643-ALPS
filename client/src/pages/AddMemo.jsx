import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const AddMemo = () => {
    const [note, setNote] = useState({
        date: new Date().toISOString().split("T")[0],
        type: "Quick Note", // Default to first option
        content: ""
    });

    const navigate = useNavigate();

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

            <button onClick={handleNoteSubmit}>Add Memo</button>
        </div>
    );
};

export default AddMemo;