import './App.css';
// import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import { DailyLog } from './pages/DailyLog';
import { NotesPage } from './pages/NotesPage';
import { DoctorQuestions } from './pages/DoctorQsPage';
import { Medicine } from './pages/MedicinePage';
import {useState} from 'react';

import React from 'react';
import Logger from './Logger'; // Adjust the path based on your folder structure
import Dropdown from './Dropdown'; // Same here
import { BrowserRouter, Routes, Route, Link } from "react-router-dom";
import Notes from "./pages/Notes"
import Add from "./pages/Add"
import Update from "./pages/Update"

function App() {
  //Which things were experienced today
  const dailyStats = [
    { type: "Tired", experiencedToday: true},
    { type: "Headache", experiencedToday: true},
    { type: "Exercised", experiencedToday: true},
    { type: "Sick", experiencedToday: true}
  ];

  //Log a note
  let [notesList, setNotesList] = useState([]);
  let [newNote, setNewNote] = useState("");

  const handleNoteSubmitting = (event) => {
    setNewNote=(event.target.value);
  }
  const addNote = () => {
    const newNotesList = [...notesList, newNote];
    setNotesList(newNotesList);
  }

  return (
    <div className="App">
      <Logger />
      <Dropdown />
      <BrowserRouter>
        <Routes>
          <Route path="/" element = {<Notes/>} />
          <Route path="/add" element = {<Add/>} />
          <Route path="/update/:id" element = {<Update/>} />
        </Routes>
        <div>
          <Link to="/">Daily Log</Link>
          <Link to="/notes">Notes</Link>
          <Link to="/medicine">Medicine</Link>
          <Link to="/doctorquestions">Doctor Questions</Link>
        </div>
        <Routes>
          <Route path="/" element={<DailyLog />} />
          <Route path="/notes" element={<NotesPage />} />
          <Route path="/medicine" element={<Medicine />} />
          <Route path="/doctorquestions" element={<DoctorQuestions />} />

          <Route path="*" element={ <h1>Page not found</h1> } />
        </Routes>
      </BrowserRouter>
      

      {/* <b>Experienced Today</b>
      {// Show which daily stats were experienced today
      dailyStats.map(
        (stat, key) => stat.experiencedToday && <ul>{stat.type}</ul>
      )}

      <br />
      Log Note <input onChange={handleNoteSubmitting} />
      <button onClick={addNote}>Add Note</button> */}
    </div>
  );
}

export default App;