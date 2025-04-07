import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import moment from 'moment';
import Update from './Update'

const Medicine = () => {
    // Note Logging
    const [notes, setNotes] = useState([]);
    const [selectedNote, setSelectedNote] = useState(null);
    const [showUpdate, setShowUpdate] = useState(false);

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

    const openUpdate = (note) => {
        setSelectedNote(note);
        setShowUpdate(true);
    };
    const closeUpdate = () => {
        setShowUpdate(false);
    };
    const handleUpdate = (updatedNote) => {
        setNotes(notes.map((n) => (n.id === updatedNote.id ? updatedNote : n)));
    };

    return (
        <div>
            <h2>Medicine Notes</h2>
            <table border="1" className="table table-striped table-hover">
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
                                <button className="btn btn-outline-primary" onClick={() => openUpdate(note)}>Update</button>
                                <button class="btn btn-outline-danger" onClick={() => handleDelete(note.id)}>Delete</button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
            <Link to="/add" class="btn btn-primary">Add new note</Link>

            {showUpdate && selectedNote && (
                <div>
                    <h3>Update Medicine Note</h3>
                    <Update
                        note={selectedNote}
                        onClose={closeUpdate}
                        onUpdate={handleUpdate}
                    />
                </div>
            )}
        </div>
    );
};

export default Medicine;
