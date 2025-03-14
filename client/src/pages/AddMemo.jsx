import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import Dropdown from "../Dropdown"

const AddMemo = () =>{
    const [note, setNote] = useState({
        date: new Date().toISOString().split("T")[0],
        type: "",
        content:""
    });

    const navigate = useNavigate()

    const handleChange = (e) =>{
        setNote(prev=>({...prev, [e.target.name]: e.target.value}));
    }

    const handleNoteSubmit = async e =>{
        e.preventDefault()
        try{
            await axios.post("http://localhost:8800/notes", note)
            navigate("/")
        } catch(err){
            console.log(err)
        }
    }

    console.log(note)
    return(
        <div className="form">
            <h1>Add New Note</h1>
            <Dropdown></Dropdown>
            <input
            type = "text" 
            placeholder = "type" 
            onChange={handleChange} 
            name = "type"
            value = {note.type}
            ></input>

            <input 
            type = "text" 
            placeholder = "content" 
            onChange={handleChange} 
            name = "content"
            ></input>
            <button onClick = {handleNoteSubmit}>Add Memo</button>
        </div>
    );
};

export default AddMemo;