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

    const [notes, setNotes] = useState([]);
    useEffect(() => {
        const fetchAllNotes = async () => {
            try {
                const res = await axios.get("http://localhost:8800/daily_log"); //is this supposed to say /daily_log instead of /notes
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

    return (
        <div>
            <h1> Calendar </h1>
            <Calendar 
            value={dateState}
            onChange={changeDate} />
            <p>Selected Date: <b>{moment(dateState).format('MMMM Do, YYYY')}</b></p>

            <div> 
                {notes.map((note) => (
                    <div className="log-entry" key={note.id}>
                        <p><strong>Tired:</strong> {note.tired ? "Yes" : "No"}</p>
                        <p><strong>Sick:</strong> {note.sick ? "Yes" : "No"}</p>
                        <p><strong>High Temperature:</strong> {note.high_temperature ? "Yes" : "No"}</p>
                        <p><strong>Exercise:</strong> {note.exercise ? "Yes" : "No"}</p>
                        <p><strong>Headache:</strong> {note.headache ? "Yes" : "No"}</p>
                        <p><strong>Chest Pain:</strong> {note.chestpain ? "Yes" : "No"}</p>
                        <p><strong>Trouble Breathing:</strong> {note.trouble_breathing ? "Yes" : "No"}</p>
                    </div>
                ))}
            </div>
        </div>
        
    )
}

export default CalendarPage;