import React, { useState } from 'react'; // ✅ Import useState
import { useNavigate, useLocation } from 'react-router-dom'; // ✅ Import useNavigate and useLocation
import axios from 'axios'; // ✅ Import axios

const Update = () => {
    const [note, setNote] = useState({
        type: "",
        content: "",
    });

    const navigate = useNavigate();
    const location = useLocation();

    const noteId = location.pathname.split("/")[2];

    const handleChange = (e) => {
        setNote((prev) => ({ ...prev, [e.target.name]: e.target.value }));
    };

    const handleClick = async (e) => {
        e.preventDefault();
        try {
            await axios.put(`http://localhost:8800/notes/${noteId}`, note);
            navigate("/");
        } catch (err) {
            console.log(err);
        }
    };

    console.log(note);
    return (
        <div className="form">
            <h1>Update the Note</h1>
            <input
                type="text"
                placeholder="type"
                onChange={handleChange}
                name="tpe"
                value={note.type} // ✅ Add value to bind state to input
            />
            <input
                type="text"
                placeholder="content"
                onChange={handleChange}
                name="content"
                value={note.content} // ✅ Add value to bind state to input
            />
            <button onClick={handleClick}>Update</button>
        </div>
    );
};

export default Update;