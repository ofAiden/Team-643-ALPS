import React, { useState, useEffect } from 'react';
import axios from 'axios';

const MedicineForm = () => {
    const [medicines, setMedicines] = useState([]);
    const [newMedicine, setNewMedicine] = useState('');
    const [selectedMedicine, setSelectedMedicine] = useState('');
    const [dosage, setDosage] = useState('');
    const [unit, setUnit] = useState('Pill/Tablet');
    const [isActive, setIsActive] = useState(false);

    // Fetch existing medicines from the backend
    useEffect(() => {
        axios.get('http://localhost:8800/medicine')
            .then(response => {
                setMedicines(response.data);
            })
            .catch(error => {
                console.error('There was an error fetching the medicines!', error);
            });
    }, []);

    // Handle adding a new medicine
    const handleAddMedicine = () => {
        if (newMedicine.trim()) {
            const medicineData = {
                medicine: newMedicine.trim(),
                dosage: 0, // Default dosage
                unit: 'Pill/Tablet', // Default unit
                active: false // Default active status
            };
            axios.post('http://localhost:8800/medicine', medicineData)
                .then(response => {
                    setMedicines([...medicines, response.data]);
                    setNewMedicine('');
                })
                .catch(error => {
                    console.error('There was an error adding the medicine!', error);
                });
        } else {
            alert('Please enter a valid medicine name.');
        }
    };

    // Handle submitting the medicine management form
    const handleSubmit = (e) => {
        e.preventDefault();
        const medicineData = {
            medicine: selectedMedicine,
            dosage: parseInt(dosage, 10),
            unit,
            active: isActive,
        };
        axios.put(`http://localhost:8800/medicine/${selectedMedicine}`, medicineData)
            .then(response => {
                alert('Medicine data updated successfully!');
            })
            .catch(error => {
                console.error('There was an error updating the medicine data!', error);
            });
    };

    return (
        <div>
            <h2>Add New Medicine</h2>
            <div>
                <input
                    type="text"
                    value={newMedicine}
                    onChange={(e) => setNewMedicine(e.target.value)}
                    placeholder="Enter medicine name"
                />
                <button type="button" onClick={handleAddMedicine}>
                    Add Medicine
                </button>
            </div>

            <h2>Manage Medicines</h2>
            <form onSubmit={handleSubmit}>
                <div>
                    <label>Select Medicine:</label>
                    <select
                        value={selectedMedicine}
                        onChange={(e) => setSelectedMedicine(e.target.value)}
                        required
                    >
                        <option value="" disabled>
                            -- Select Medicine --
                        </option>
                        {medicines.map((med, index) => (
                            <option key={index} value={med.medicine}>
                                {med.medicine}
                            </option>
                        ))}
                    </select>
                </div>

                <div>
                    <label>Dosage:</label>
                    <input
                        type="number"
                        value={dosage}
                        onChange={(e) => setDosage(e.target.value)}
                        required
                    />
                </div>

                <div>
                    <label>Unit:</label>
                    <select
                        value={unit}
                        onChange={(e) => setUnit(e.target.value)}
                        required
                    >
                        <option value="Pill/Tablet">Pill/Tablet</option>
                        <option value="mL">mL</option>
                        <option value="mg">mg</option>
                    </select>
                </div>

                <div>
                    <label>
                        <input
                            type="checkbox"
                            checked={isActive}
                            onChange={(e) => setIsActive(e.target.checked)}
                        />
                        Active
                    </label>
                </div>

                <button type="submit">Submit</button>
            </form>
        </div>
    );
};

export default MedicineForm;
