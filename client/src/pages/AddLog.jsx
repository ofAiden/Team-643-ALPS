import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const AddLog = () => {
    const [log, setLog] = useState({
        tired: 0, // Range 0-10
        sick: 0,
        high_temperature: 0,
        exercise: 0,
        headache: 0,
        chestpain: 0,
        trouble_breathing: 0
    });

    const navigate = useNavigate();

    // Handle changes for "tired" (dropdown)
    const handleTiredChange = (e) => {
        setLog(prev => ({ ...prev, tired: parseInt(e.target.value, 10) }));
    };

    // Handle checkbox changes (set 1 if checked, 0 if unchecked)
    const handleCheckboxChange = (e) => {
        const { name, checked } = e.target;
        setLog(prev => ({ ...prev, [name]: checked ? 1 : 0 })); // ✅ Set 1 for true, 0 for false
    };

    // Submit log to backend
    const handleSubmit = async (e) => {
        e.preventDefault();

        console.log("Form data to submit:", log); // Debugging before sending

        try {
            const response = await axios.post("http://localhost:8800/daily_log", log);
            console.log("Response from server:", response); // Debug: Verify server response
            navigate("/"); // Redirect after submission
        } catch (err) {
            console.error("Error submitting daily log:", err);
        }
    };

    return (
        <div className="form">
            <h1>Add Daily Log</h1>

            <form onSubmit={handleSubmit}>
                {/* Tired Input (Dropdown 0-10) */}
                <div>
                    <label>Tired (0-10):</label>
                    <select name="tired" onChange={handleTiredChange} value={log.tired}>
                        {[...Array(11).keys()].map(num => (
                            <option key={num} value={num}>{num}</option>
                        ))}
                    </select>
                </div>

                {/* Checkbox Inputs for Boolean Fields */}
                {["sick", "high_temperature", "exercise", "headache", "chestpain", "trouble_breathing"].map((key) => (
                    <div key={key}>
                        <label>
                            <input 
                                type="checkbox" 
                                name={key} 
                                checked={log[key] === 1} 
                                onChange={handleCheckboxChange} 
                            />
                            {key.replace("_", " ")}
                        </label>
                    </div>
                ))}

                <button type="submit">Submit Log</button>
            </form>
        </div>
    );
};

export default AddLog;