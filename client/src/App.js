import './App.css';
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min";
import React from 'react';
import { BrowserRouter, Routes, Route, Link } from "react-router-dom";
import Home from "./pages/Home";
import AddMemo from "./pages/AddMemo";
import Notes from './pages/Notes';
import DoctorQuestions from './pages/DoctorQsPage';
import Medicine from './pages/MedicinePage';
import AddLog from "./pages/AddLog"; // This is correct, no change needed
import Calendar from "./pages/CalendarPage";
import MedicineForm from "./pages/AddMedicine";
import MedicineNameForm from "./pages/AddName";
import MedicineChart from "./pages/MedicineCharts";

function App() {
  return (
    <div className="App">
      <BrowserRouter>
      {/* navigation bar */}
        <nav class="navbar navbar-expand-lg bg-body-tertiary">
          <div class="container-fluid">
            <a class="navbar-brand" href="/">Home</a>
            <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNavAltMarkup" aria-controls="navbarNavAltMarkup" aria-expanded="false" aria-label="Toggle navigation">
              <span class="navbar-toggler-icon"></span>
            </button>
            <div class="collapse navbar-collapse" id="navbarNavAltMarkup">
              <div class="navbar-nav">
                <a class="nav-link" href="/notes">Notes</a>
                <a class="nav-link" href="/calendar">Calendar</a>
                <a class="nav-link" href="/medicine">Medicine</a>
                <a class="nav-link" href="/doctorquestions">Doctor Questions</a>
                <a class="nav-link" href="/addmedicine">Add Medicine</a>
                <a class="nav-link" href="/medicinechart">Medicine Charts</a>
              </div>
            </div>
          </div>
        </nav>

        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/notes" element={<Notes />} />
          <Route path="/add" element={<AddMemo />} />
          {/* <Route path="/update/:id" element={<Update />} /> */}
          <Route path="/calendar" element={<Calendar />} />
          <Route path="/medicine" element={<Medicine />} />
          <Route path="/doctorquestions" element={<DoctorQuestions />} />
          <Route path="/addmedicine" element={<MedicineForm />} />
          <Route path="/add-medicine-name" element={<MedicineNameForm />} />
          <Route path="/medicinechart" element={<MedicineChart />} />
          <Route path="/daily_log" element={<AddLog />} /> {/* This matches the backend route */}
          <Route path="*" element={<h1>Page not found</h1>} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
