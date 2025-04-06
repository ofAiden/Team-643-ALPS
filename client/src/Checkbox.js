import './App.css';
import { useState } from "react";
import * as React from 'react';

export default function Checkbox({label, checked, onChange}) {
/* label: label what it is, checked: true/false, onChange function to update state */
    return (
        <div class="form-check">
            <label>
            {label}
            <input
                class="form-check-input"
                type="checkbox"
                value=""
                checked={checked}
                onChange={(e) => onChange(e.target.checked)}
            />
            </label>
        </div>
    );
}