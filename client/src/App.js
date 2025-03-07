import React from 'react';
import Logger from './Logger'; // Adjust the path based on your folder structure
import Dropdown from './Dropdown'; // Same here
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Notes from "./pages/Notes"
import Add from "./pages/Add"
import Update from "./pages/Update"


function App() {
  return (
    <div>
      <Logger />
      <Dropdown />
      <BrowserRouter>
        <Routes>
          <Route path="/" element = {<Notes/>} />
          <Route path="/add" element = {<Add/>} />
          <Route path="/update/:id" element = {<Update/>} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;