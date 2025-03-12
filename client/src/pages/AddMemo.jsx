import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import Dropdown from "../Dropdown"

const AddMemo = () =>{
    const [note,setNote] = useState({
        title:"",
        content:"",
    });

    const navigate = useNavigate()

    const handleChange = (e) =>{
        setNote(prev=>({...prev, [e.target.name]: e.target.value}));
    }

    const handleClick = async e =>{
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
            placeholder = "title" 
            onChange={handleChange} 
            name = "title"
            ></input>

            <input 
            type = "text" 
            placeholder = "content" 
            onChange={handleChange} 
            name = "content"
            ></input>
            <button onClick = {handleClick}>Add Memo</button>
        </div>
    );
};

export default AddMemo;