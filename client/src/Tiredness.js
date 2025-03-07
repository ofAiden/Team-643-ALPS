import { useState } from "react";
import * as React from 'react';
import './App.css';

export default function Tiredness() {
    const TirednessSlider = () => {
    }
    const [tiredness, setTiredness] = useState(5); //(?) default value

    return(
    <div>
        Tiredness
        <input 
            type="range"
            min="1"
            max="10"
            value={tiredness}
            onChange={(e) => setTiredness(e.target.value)}
            list="tickmarks"
        />
        <datalist id="tickmarks">
            {[...Array(10)].map((_, i) => (
        <option key={i} value={i + 1} />
        ))}
        </datalist>
    </div>
    )
}