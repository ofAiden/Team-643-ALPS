import './App.css';
import React from 'react';
import { BrowserRouter, Routes, Route, Link } from "react-router-dom";
// import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import DailyLog from "./pages/Daily_Log"
import AddMemo from "./pages/AddMemo"
import Update from "./pages/Update"
import { ViewNotes } from './pages/ViewNotes';
import { DoctorQuestions } from './pages/DoctorQsPage';
import { Medicine } from './pages/MedicinePage';

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <div> {/* navigation bar */}
          <Link to="/">Daily Log</Link>
          <Link to="/notes">Notes</Link>
          <Link to="/medicine">Medicine</Link>
          <Link to="/doctorquestions">Doctor Questions</Link>
        </div>

        <Routes>
          <Route path="/" element={<DailyLog />} />
          <Route path="/add" element={<AddMemo />} />
          <Route path="/update/:id" element = {<Update/>} />
          <Route path="/notes" element={<ViewNotes />} />
          <Route path="/medicine" element={<Medicine />} />
          <Route path="/doctorquestions" element={<DoctorQuestions />} />
          <Route path="*" element={<h1>Page not found</h1>} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;