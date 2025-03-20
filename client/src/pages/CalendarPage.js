import React from 'react';
import { Calendar, dateFnsLocalizer } from 'react-big-calendar';
import format from "date-fns/format";
import parse from "date-fns/parse";
import { startOfWeek } from 'date-fns';
import { getDay } from 'date-fns/getDay';
import "react-big-calendar/lib/css/react-big-calendar.css";
import DatePicker from 'react-datepicker';
import { useState } from 'react';

const locales = {"en-US": require("date-fns/locale/en-US")}
const localizer = dateFnsLocalizer({
    format,
    parse,
    startOfWeek,
    getDay,
    locales
})

//data for testing and to display on calendar
const events = [
    {
        title: "Tired",
        start: new Date(2025, 3, 18),
        end: new Date(2025, 3, 19)
    },
    {
        title: "Sick",
        start: new Date(2025, 3, 3),
        end: new Date(2025, 3, 12)
    },
    {
        title: "Steroid X",
        start: new Date(2024,11,25),
        end: new Date(2025,3,19)
    }
]

const CalendarPage = () => {
    const [newEvent, setNewEvent] = useState({title: "", start: "", end: ""})
    const [allEvents, setAllEvents] = useState(events)

    return (
        <div>
            <h1> Calendar </h1>
            <Calendar 
            localizer={localizer} 
            events={allEvents} 
            startAccessor="start" 
            endAccessor="end" 
            style={{height: 500, margin: "50px"}} />
        </div>
    )
}

export default CalendarPage;