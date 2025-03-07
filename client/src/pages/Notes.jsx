import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom"; // ✅ Import Link

const Notes = () => {
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
            <h1>Notes</h1>
            {notes.map((note) => ( // ✅ Moved key inside .map()
                <div className="note" key={note.id}>
                    <h2>{note.title}</h2>
                    <p>{note.content}</p>
                    <button className="delete" onClick={() => handleDelete(note.id)}>Delete</button>
                    <button className="update">
                        <Link to={`/update/${note.id}`}>Update</Link> {/* ✅ Fixed template literal */}
                    </button>
                </div>
            ))}
            <button>
                <Link to="/add">Add new note</Link>
            </button>
        </div>
    );
};

export default Notes;