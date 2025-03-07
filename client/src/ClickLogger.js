import { useState } from "react";

export default function ClickLogger() {
    //functions to edit the number of chest pains
    let [chestPains, setChestPains]=useState(0);
    
    const increaseChestPains = () => {
    setChestPains(chestPains + 1);
    };
    const decreaseChestPains = () => {
    setChestPains( (chestPains >0) ? chestPains - 1 : 0);
    };
    const resetChestPains = () => {
    setChestPains(0);
    };

    return (
        <div>
            Chest Pains: {chestPains}
            <button onClick={increaseChestPains}>Increase</button>
            <button onClick={decreaseChestPains}>Decrease</button>
            <button onClick={resetChestPains}>Set to Zero</button>
        </div>
    )
}