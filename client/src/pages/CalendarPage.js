import React, {useState, useEffect} from 'react';
import { Calendar } from 'react-calendar';
import "react-calendar/dist/Calendar.css";
import moment from 'moment';
import axios from 'axios';


const CalendarPage = () => {
    const [dateState, setDateState] = useState(new Date())
    const changeDate = (e) => {
        setDateState(e)
    }

    //fetch info from daily_log
    const [logs, setLogs] = useState([]);
    useEffect(() => {
        const fetchAllLogs = async () => {
            try {
                const res = await axios.get("http://localhost:8800/daily_log");
                console.log('Backend Response:', res.data);  // Log the response data
                if (Array.isArray(res.data)) {
                    setLogs(res.data);  // Set logs only if it's an array
                } else {
                    console.log("Unexpected response data:", res.data);  // If it's not an array, log it
                }
            } catch (err) {
                console.log("Error fetching logs:", err);
            }
        };
    
        fetchAllLogs();
    }, []);


    // fetch info from notes
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


    //obtaining the daily log that was logged on a selected day
    const daysLog = logs.filter((log) =>{
        const logDate = moment(log.date).format('YYYY-MM-DD'); //setting format of the date sent from backend
        const selectedDate = moment(dateState).format('YYYY-MM-DD'); //setting format of the date inputted from frontend

        return logDate === selectedDate; //returns true if the log in the database has the same date as the selected date
    })

    //obtaining the memos of type Quick Note. returns True if the memo is a Quick Note and matches the selected date on the calendar
    const daysNotes = notes.filter((note) => note.type === "Quick Note" && moment(note.date).format('YYYY-MM-DD') === moment(dateState).format('YYYY-MM-DD'));

    return (
        <div>
            <h1> Calendar </h1>
            <Calendar 
            value={dateState}
            onChange={changeDate} />
            <p>Selected Date: <b>{moment(dateState).format('MMMM Do, YYYY')}</b></p>

            <div>
                {/* Displaying notes */}
                <h3>Notes</h3>
                {daysNotes.map((note) => (
                    <div key={note.id}>
                        <ul>{note.content}</ul>
                    </div> 
                ))}
                
                {/* Displaying data from daily log */}
                {daysLog.map((log) => (
                    //the Daily Log for that date
                    <div className="log-entry" key={log.id}>
                        <p><strong>Tiredness:</strong> {log.tired ? <strong>{log.tired}</strong> : "Not Logged"}</p>
                        {log.sick == 1 && <p><strong>Sick: Yes</strong></p>}
                        {(log.sick || log.high_temperature) && (<p>High Temperature:  {log.high_temperature ? <strong>Yes</strong> : log.sick===1 ? <strong>No</strong> : null}</p>)}
                        <p><strong>Exercise:</strong> {log.exercise ? <strong>Yes</strong> : "No"}</p>
                        <p><strong>Headache:</strong> {log.headache ? <strong>Yes</strong> : "No"}</p>
                        <p><strong>Chest Pain:</strong> {log.chestpain ? <strong>Yes</strong> : "No"}</p>
                        <p><strong>Trouble Breathing:</strong> {log.trouble_breathing ? <strong>Yes</strong> : "No"}</p>
                    </div>
                ))}
            </div>
        </div>
        
    )
}

export default CalendarPage;