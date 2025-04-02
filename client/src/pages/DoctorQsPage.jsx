import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import moment from 'moment';


const DoctorQuestions = () => {
    // Note Logging
    const [notes, setNotes] = useState([]);

    useEffect(() => {
        const fetchAllNotes = async () => {
            try {
                const res = await axios.get("http://localhost:8800/notes");
                console.log('Backend Response:', res.data);  // Log the response data
                if (Array.isArray(res.data)) {
                    const filteredNotes = res.data.filter(note => note.type === "Doctor Question");
                    setNotes(filteredNotes);  // Set only filtered notes
                } else {
                    console.log("Unexpected response data:", res.data);  // If it's not an array, log it
                }
            } catch (err) {
                console.log("Error fetching notes:", err);
            }
        };
    
        fetchAllNotes();
    }, []);
    
    const handleDelete = async (id) => {
        try {
            await axios.delete(`http://localhost:8800/notes/${id}`);
            setNotes(notes.filter((note) => note.id !== id));
        } catch (err) {
            console.log(err);
        }
    };

    return (
        <div>
            <div>
                <h2>Record a note</h2>
                <table border = "1">
                    <thead>
                        <tr>
                            <th>Date</th>
                            <th>Doctor Questions</th>
                            <th>Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {notes.map((note) => (
                            <tr key={note.id}>
                                <td>{moment(note.date).format('YYYY-MM-DD')}</td>
                                <td>{note.content}</td>
                                <td>
                                    <button className="delete" onClick={() => handleDelete(note.id)}>Delete</button>
                                    <button className="update">
                                        <Link to={`/update/${note.id}`}>Update</Link>
                                    </button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>

                <button>
                    <Link to="/add">Add new entry</Link>
                </button>
            </div>

            {/*what is this div below for*/}
        </div>
    );
};

export default DoctorQuestions;
