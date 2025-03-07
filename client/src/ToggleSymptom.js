import { useState } from "react";

export default function ToggleSymptom() {
    //Toggle whether Sophie felt sick today
    const [feltSick, setFeltSick] = useState(false);
    const [headache, setHeadache] = useState(false);


    return (
        <div>
            <br />
            <button onClick={() => {
              setFeltSick(!feltSick);
            }}>
              Felt Sick
            </button>
            <button onClick={() => {
              setHeadache(!headache);
            }}>
              Headache
            </button>
            {feltSick === true && <p>Felt sick today</p>}
            {headache === true && <p>Had headache today</p>}
        </div>
    )
}