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


    //fetch info from notes
    // const [notes, setNotes] = useState([]);
    // useEffect(() => {
    //     const fetchAllNotes = async () => {
    //         try {
    //             const res = await axios.get("http://localhost:8800/notes"); //is this supposed to say /daily_log instead of /notes
    //             console.log('Backend Response:', res.data);  // Log the response data
    //             if (Array.isArray(res.data)) {
    //                 setNotes(res.data);  // Set notes only if it's an array
    //             } else {
    //                 console.log("Unexpected response data:", res.data);  // If it's not an array, log it
    //             }
    //         } catch (err) {
    //             console.log("Error fetching notes:", err);
    //         }
    //     };
    
    //     fetchAllNotes();
    // }, []);


    //obtaining the daily log that was logged on a selected day
    const daysLog = logs.filter((log) =>{
        const logDate = moment(log.date).format('YYYY-MM-DD'); //setting format of the date sent from backend
        const selectedDate = moment(dateState).format('YYYY-MM-DD'); //setting format of the date inputted from frontend

        return logDate === selectedDate; //returns true if the log in the database has the same date as the selected date
    })

    return (
        <div>
            <h1> Calendar </h1>
            <Calendar 
            value={dateState}
            onChange={changeDate} />
            <p>Selected Date: <b>{moment(dateState).format('MMMM Do, YYYY')}</b></p>

            <div> 
                {daysLog.map((note) => (
                    <div className="log-entry" key={note.id}>
                        <p><strong>Tiredness:</strong> {note.tired ? <strong>{note.tired}</strong> : "No"}</p>
                        <p><strong>Sick:</strong> {note.sick ? <strong>Yes</strong> : "No"}</p>
                        <p><strong>High Temperature:</strong> {note.high_temperature ? <strong>Yes</strong> : "No"}</p>
                        <p><strong>Exercise:</strong> {note.exercise ? <strong>Yes</strong> : "No"}</p>
                        <p><strong>Headache:</strong> {note.headache ? <strong>Yes</strong> : "No"}</p>
                        <p><strong>Chest Pain:</strong> {note.chestpain ? <strong>Yes</strong> : "No"}</p>
                        <p><strong>Trouble Breathing:</strong> {note.trouble_breathing ? <strong>Yes</strong> : "No"}</p>
                    </div>
                ))}
            </div>
        </div>
        
    )
}

export default CalendarPage;