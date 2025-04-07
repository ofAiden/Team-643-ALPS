import React from "react";
import { Link } from "react-router-dom";

const Home = () => {
    // Note Logging
    return (
        <div class="mx-auto p-2">
            <Link to="/add" class="btn btn-primary btn-lg">Add new note</Link>
            <Link to="/daily_log" class="btn btn-primary btn-lg">Add new daily log</Link>
        </div>
        
    );
};

export default Home;