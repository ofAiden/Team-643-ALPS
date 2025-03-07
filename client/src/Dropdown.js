import * as React from 'react';

const App = () => {

 const [time, setTime] = React.useState('Morning');

 const handleTimeChange = (event) => {
   setTime(event.target.value);
 };

 return (

   <div>

     <Dropdown

       label="What is the time of day?"

       options={[

         { label: 'Morning', value: 'morning' },

         { label: 'Afternoon', value: 'afternoon' },

         { label: 'Night', value: 'night' },

       ]}

       value={time}

       onChange={handleTimeChange}

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

         <option value={option.value}>{option.label}</option>

       ))}

     </select>

   </label>

 );

};