import { useState } from "react";
import * as React from 'react';
import './App.css';

export default function NoteLogger() {
  const [text, setText] = useState("");
  const [notes, setNotes] = useState([]);
  
  // Button to submit memo
  const Submit = () => {
    if (text.trim() !== "") {
      setNotes([...notes, text]);
      setText("");
    }
    //then, send the note to the database
  };

  // Dropdown menu to select type of memo
  const [openDropdown, setOpen] = React.useState(false);
  const handleOpen = () => {
    setOpen(!openDropdown);
  }
  const handleQuickNote = () => {
    // do stuff
    setOpen(false);
  }
  const handleDoctorQuestion = () => {
    // change placeholder to "Jot down a question"
    setOpen(false);
  }
  const handleMedicine = () => {
    //change input field
    setOpen(false);
  }

  // Clear the list of memos submitted
  const Clear = () => {
    if (setNotes != null){
      setNotes([]);
    }
  }

  return (
    <div>
      {/* Text box for logging a memo */}
      <input
        value={text}
        onChange={(words) => setText(words.target.value)}
        placeholder="Enter note"
      />
      <button onClick={Submit}>Submit Note</button>
      {/* <button onClick={Clear}>Clear</button> */}

      {/* Dropdown menu to select type of memo */}
      <button onClick={handleOpen}>Type of memo</button>
      {openDropdown ? (
        <ul className="logMenu">
          <li className="menu-item">
            <button
              type="button"
              onClick={() => handleQuickNote( {/*something*/} )}
            > Quick Note </button>
          </li>
          <li className="menu-item">
            <button
              type="button"
              onClick={() => handleDoctorQuestion( {/*something*/} )}
            > Doctor Question </button>
          </li>
          <li className="menu-item">
            <button
              type="button"
              onClick={() => handleMedicine( {/*something*/} )}
            > Medication </button>
          </li>
        </ul>
      ) : null }

      {/* List displaying the notes that were inputted */}
      <div>
        {notes.length === 0 ? (
          <p>No notes yet</p>
        ) : (
          notes.map((note, index) => (
            <div key={index}>{note}</div>
          ))
        )}
      </div>
    </div>
  );
}
