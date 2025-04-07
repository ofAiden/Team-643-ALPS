// MedicineNameForm.jsx
import React, { useState } from 'react';
import axios from 'axios';

const MedicineNameForm = () => {
    const [newMedicine, setNewMedicine] = useState('');

    const handleAddMedicineName = () => {
        if (newMedicine.trim()) {
            axios.post('http://localhost:8800/medicinename', { medicine: newMedicine.trim() })
                .then(response => {
                    alert(response.data.message);
                    setNewMedicine('');
                })
                .catch(error => {
                    console.error('Error adding new medicine name:', error);
                    alert('Failed to add medicine name.');
                });
        } else {
            alert('Please enter a valid medicine name.');
        }
    };

    return (
        <div>
            <h2>Add New Medicine Name</h2>
            <input
                type="text"
                value={newMedicine}
                onChange={(e) => setNewMedicine(e.target.value)}
                placeholder="Enter new medicine name"
            />
            <button onClick={handleAddMedicineName}>
                Add Medicine Name
            </button>
        </div>
    );
};

export default MedicineNameForm;