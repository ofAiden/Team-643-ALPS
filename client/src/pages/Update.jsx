import React, { useState } from 'react';
import axios from 'axios';
import moment from 'moment';

const Update = ({note, onClose, onUpdate}) => {
    console.log("Update modal rendered", note);
    const [updatedNote, setUpdatedNote] = useState(note);

    const handleChange = (e) => {
        setUpdatedNote((prev) => ({ ...prev, [e.target.name]: e.target.value }));
    };

    const handleDateChange = (e) => {
        setUpdatedNote((prev) => ({ ...prev, date: e.target.value }));
    };

    const handleSubmit = async () => {
        console.log("updating note to: ", updatedNote);
        try {
            const formattedDate = new Date(updatedNote.date).toISOString().split('T')[0];  // formats as YYYY-MM-DD for MySQL
            const updatedFormattedNote = { ...updatedNote, date: formattedDate }; //note with date in required format

            // send updated note to backend
            await axios.put(`http://localhost:8800/notes/${updatedNote.id}`, updatedFormattedNote);
            onUpdate(updatedFormattedNote);  // send updated note to parent component
            onClose();  // close the pop-up
        } catch (err) {
            console.log("Error updating note:", err);
        }
    };

    console.log(note);
    return (
        <div>
            <h3>Update a Note</h3>
            <input
                type="date"
                value={updatedNote.date ? moment(updatedNote.date).format("YYYY-MM-DD") : ""}
                onChange={handleDateChange}
            />
            <select name="type" value={updatedNote.type} onChange={handleChange}>
                <option value="Quick Note">Quick Note</option>
                <option value="Doctor Question">Doctor Question</option>
                <option value="Medicine">Medicine</option>
            </select>
            <input
                type="text"
                placeholder="content"
                onChange={handleChange}
                name="content"
                value={updatedNote.content} // value binds the state to the input
            />
            <button onClick={handleSubmit}>Update</button>
            <button onClick={onClose}>Cancel</button>
        </div>
    );
};

export default Update;