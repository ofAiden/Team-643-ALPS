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
        <div class="mx-auto p-2">
            <Link to="/add" class="btn btn-primary btn-lg">Add new note</Link>
            <Link to="/daily_log" class="btn btn-primary btn-lg">Add new daily log</Link>
        </div>
        
    );
};

export default Daily_Log;