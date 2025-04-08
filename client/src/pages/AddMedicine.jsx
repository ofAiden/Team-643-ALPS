import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const MedicineForm = () => {
    const [medicineOptions, setMedicineOptions] = useState([]);
    const [selectedMedicine, setSelectedMedicine] = useState('');
    const [dosage, setDosage] = useState('');
    const [unit, setUnit] = useState('Pill/Tablet');
    const [isActive, setIsActive] = useState(false);
    const [date, setDate] = useState(
        new Date().toLocaleDateString("en-CA", { timeZone: "America/Los_Angeles" })
    );

    const navigate = useNavigate();

    useEffect(() => {
        axios.get('http://localhost:8800/medicinename')
            .then(response => {
                const data = response.data;
                if (Array.isArray(data)) {
                    setMedicineOptions(data);
                } else {
                    console.warn('Unexpected data format for medicine names:', data);
                    setMedicineOptions([]);
                }
            })
            .catch(error => {
                console.error('Error fetching medicine names:', error);
                alert('Could not load medicine names from server.');
            });
    }, []);

    const handleSubmit = (e) => {
        e.preventDefault();
        const medicineData = {
            medicine: selectedMedicine,
            dosage: parseInt(dosage, 10),
            unit,
            active: isActive,
            date
        };

        axios.post('http://localhost:8800/medicine', medicineData)
            .then(response => {
                alert('Medicine data submitted successfully!');
                setSelectedMedicine('');
                setDosage('');
                setUnit('Pill/Tablet');
                setIsActive(false);
                setDate(new Date().toLocaleDateString("en-CA", { timeZone: "America/Los_Angeles" }));
            })
            .catch(error => {
                console.error('Error submitting medicine data:', error);
                alert('Failed to submit medicine data.');
            });
    };

    return (
        <div>
            <button onClick={() => navigate('/add-medicine-name')}>➕ Add New Medicine Name</button>
            <h2>Manage Medicines</h2>
            <form onSubmit={handleSubmit}>
                <div>
                    <label>Select Medicine:</label>
                    <select
                        value={selectedMedicine}
                        onChange={(e) => setSelectedMedicine(e.target.value)}
                        required
                    >
                        <option value="" disabled>-- Select Medicine --</option>
                        {medicineOptions.map((med, index) => (
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
                    <label>Date:</label>
                    <input
                        type="date"
                        value={date}
                        onChange={(e) => setDate(e.target.value)}
                        required
                    />
                </div>

                <div className="form-check form-switch">
                    <label>
                        <input
                            className="form-check-input"
                            type="checkbox"
                            role="switch"
                            id="switchCheckDefault"
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