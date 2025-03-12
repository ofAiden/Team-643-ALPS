import * as React from 'react';

const App = () => {
  const [noteType, setType] = React.useState('Quick Note');
  
  const handleTypeChange = (event) => {
   setType(event.target.value);
 };
 
 return (
  <div>
    <Dropdown
    label="" //optional text to appear in front of dropdown
    options={[
      { label: 'Quick Note', value: 'quickNote' },
      { label: 'Doctor Question', value: 'doctorQ' },
      { label: 'Medicine', value: 'medicine' },
    ]}
    value={noteType}
    onChange={handleTypeChange}
    />
  </div>
 );
};
export default App;


const Dropdown = ({ label, value, options, onChange }) => {
  return (
  <label>
    {label}
    <select value={value} onChange={onChange}>
      {options.map((option) => (
        <option value={option.value}> {option.label} </option>
      ))}
    </select>
  </label>
  );
};