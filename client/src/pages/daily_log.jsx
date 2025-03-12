import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const daily_log = () => {
    const [log, setLog] = useState({
        tired: 0,
        sick: 0,
        high_temperature: 0,
        exercise: 0,
        headache: 0,
        chestpain: 0,
        trouble_breathing: 0
    });

    const navigate = useNavigate();

    const handleChange = (e) => {
        setLog(prev => ({ ...prev, [e.target.name]: parseInt(e.target.value, 10) || 0 }));
    };

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
            {Object.keys(log).map((key) => (
                <div key={key}>
                    <label>{key.replace("_", " ")}:</label>
                    <select name={key} onChange={handleChange} value={log[key]}>
                        <option value="0">No</option>
                        <option value="1">Yes</option>
                    </select>
                </div>
            ))}
            <button onClick={handleClick}>Submit Log</button>
        </div>
    );
};

export default daily_log;
