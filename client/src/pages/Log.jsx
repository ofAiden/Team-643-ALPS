import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const Log = () => {
    const [log, setLog] = useState({
        tired: 0, // Can be 0-10
        sick: 0,
        high_temperature: 0,
        exercise: 0,
        headache: 0,
        chestpain: 0,
        trouble_breathing: 0
    });

    const navigate = useNavigate();

    // Handle changes for "tired" (number 0-10)
    const handleTiredChange = (e) => {
        setLog(prev => ({ ...prev, tired: parseInt(e.target.value, 10) }));
    };

    // Handle changes for checkboxes (0 or 1)
    const handleCheckboxChange = (e) => {
        const { name, checked } = e.target;
        setLog(prev => ({ ...prev, [name]: checked ? 1 : 0 }));
    };

    // Submit form
    const handleClick = async (e) => {
        e.preventDefault();
        try {
            await axios.post("http://localhost:8800/daily_log", log);
            navigate("/");
        } catch (err) {
            console.log(err);
        }
    };

    return (
        <div className="form">
            <h1>Daily Log</h1>

            {/* Tired - Select from 0 to 10 */}
            <div>
                <label>Tired (0-10):</label>
                <select name="tired" onChange={handleTiredChange} value={log.tired}>
                    {[...Array(11).keys()].map(num => (
                        <option key={num} value={num}>{num}</option>
                    ))}
                </select>
            </div>

            {/* Checkboxes for other boolean fields */}
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

            <button onClick={handleClick}>Submit Log</button>
        </div>
    );
};

export default Log;