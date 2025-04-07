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
            <h1>Add New Memo</h1>

            <form onSubmit={handleNoteSubmit}>
                <div className="row g-2">
                    {/* input for date */}
                    <div className="col-auto">
                        <div className="form-floating">
                            <input 
                                type="date" 
                                className="form-control" 
                                value={note.date} 
                                onChange = {handleDateChange}/>
                            <label htmlFor="floatingSelectGrid">Date</label>
                        </div>
                    </div>

                    {/* Dropdown for selecting type */}
                    <div className="col-auto">
                        <label htmlFor="floatingSelect">Type of Memo</label>
                        <select className="form-select" name="type" onChange={handleChange} value={note.type} style={{ width: '200px' }}>
                            <option value="Quick Note">Quick Note</option>
                            <option value="Doctor Question">Doctor Question</option>
                            <option value="Medicine">Medicine</option>
                        </select>
                    </div>
                    
                    {/* text box for entering note */}
                    <div class="col-md-6">
                        <div class="form-floating">
                        <input
                            type="text"
                            name="content"
                            className="form-control"
                            placeholder="Add a note"
                            onChange={handleChange}
                            value={note.content}
                        />
                        <label htmlFor="floatingInputGrid">Content</label>
                        </div>
                    </div>
                </div>

                <button type="submit" className="btn btn-primary btn-md">Submit Note</button>
            </form>

        </div>
    );
};

export default AddMemo;