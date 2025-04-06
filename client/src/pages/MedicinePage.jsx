import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import moment from 'moment';

const Medicine = () => {
    // Note Logging
    const [notes, setNotes] = useState([]);

    useEffect(() => {
        const fetchAllNotes = async () => {
            try {
                const res = await axios.get("http://localhost:8800/notes");
                console.log('Backend Response:', res.data);  // Log the response data
                if (Array.isArray(res.data)) {
                    const filteredNotes = res.data.filter(note => note.type === "Medicine");
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
            <h2>Medicine Notes</h2>
            <table border="1" class="table table-striped table-hover">
                <thead>
                    <tr>
                        <th>Date</th>
                        <th>Medicine</th>
                        <th>Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {notes.map((note) => (
                        <tr key={note.id}>
                            <td>{moment(note.date).format('YYYY-MM-DD')}</td>
                            <td>{note.content}</td>
                            <td>
                                <Link to={`/update/${note.id}`} class="btn btn-outline-primary">Update</Link>
                                <button class="btn btn-outline-danger" onClick={() => handleDelete(note.id)}>Delete</button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
            <Link to="/add" class="btn btn-primary">Add new note</Link>
        </div>
    );
};

export default Medicine;
