import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";

const DailyLog = () => {
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
        } catch (err) {
            console.log(err);
        }
    };

    return (
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
                    <button className="update">
                        <Link to={`/update/${log.id}`}>Update</Link>
                    </button>
                </div>
            ))}
            <button>
                <Link to="/add">Add new entry</Link>
            </button>
        </div>
    );
};

export default DailyLog;