import ToggleSymptom from '../ToggleSymptom';
import NoteLogger from '../NoteLogger';
import ClickLogger from '../ClickLogger';
import Tiredness from '../Tiredness';
import Checkbox from '../Checkbox';
import { useState } from 'react';

export const DailyLog = () => {
    const [checkboxes, setCheckboxes] = useState({
        sick: false,
        highTemp: false,
        exercise: false,
        headache: false,
        troubleBreathing: false
    });

    const handleCheckboxChange = (name, value) => {
        setCheckboxes(prev => ({...prev, [name]: value}));
    };

    return (
        <div>
            <h1> Daily Log </h1>
            <NoteLogger />
            <Tiredness />
            <Checkbox 
                label="Sick" 
                checked={checkboxes.sick} 
                onChange={(val) => handleCheckboxChange("sick", val)}
            />
            <Checkbox 
                label="High Temperature" 
                checked={checkboxes.highTemp} 
                onChange={(val) => handleCheckboxChange("highTemp", val)}
            />
            <Checkbox 
                label="Exercise" 
                checked={checkboxes.exercise} 
                onChange={(val) => handleCheckboxChange("exercise", val)}
            />
            <Checkbox 
                label="Headache" 
                checked={checkboxes.headache} 
                onChange={(val) => handleCheckboxChange("headache", val)}
            />
            <Checkbox 
                label="Trouble Breathing" 
                checked={checkboxes.troubleBreathing} 
                onChange={(val) => handleCheckboxChange("troubleBreathing", val)}
            />
        </div>
    )
}