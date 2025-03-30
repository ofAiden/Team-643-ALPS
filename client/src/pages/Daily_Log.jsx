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

const Daily_Log = () => {
    // Note Logging
    return (
        <div>
            <div>
                <h2>Record a note</h2>
                <button>
                    <Link to="/add">Add new note</Link>
                </button>
                <h2>Daily Log</h2>
                <button>
                    <Link to="/daily_log">Add new log</Link>
                </button>
            </div>
        </div>
    );
};

export default Daily_Log;