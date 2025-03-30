import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";

const Notes = () => {
    // Note Logging
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
                {notes.map((note) => (
                    <div className="note" key={note.id}>
                        <p>{note.content}</p>
                        <button className="delete" onClick={() => handleDelete(note.id)}>Delete</button>
                        <button className="update">
                            <Link to={`/update/${note.id}`}>Update</Link>
                        </button>
                    </div>
                ))}
                <button>
                    <Link to="/add">Add new entry</Link>
                </button>
            </div>

            {/*what is this div below for*/}
        </div>
    );
};

export default Notes;