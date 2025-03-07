import './App.css';
import { useState } from "react";
import * as React from 'react';

export default function Checkbox({label, checked, onChange}) 
/* label: label what it is, checked: true/false, onChange function to update state */ 
{
    return (
        <div>
            <label>
            {label}
            <input
                type="checkbox"
                checked={checked}
                onChange={(e) => onChange(e.target.checked)}
            />
            </label>
        </div>
    );
}