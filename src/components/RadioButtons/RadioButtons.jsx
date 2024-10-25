import React, { useState } from 'react';
import './RadioButtons.css'; // Import CSS file for styling

function RadioButtons() {
    const values = [1, 2, 3, 5, 8, 13];
    const [selectedValue, setSelectedValue] = useState(null);

    const handleSelection = (value) => {
        setSelectedValue(value);
    };

    return (
        <div className="radio-buttons-container">
            {values.map((value, index) => (
                <label key={index} className="radio-button-label">
                    <input
                        type="radio"
                        name="fibonacci"
                        value={value}
                        checked={selectedValue === value}
                        onChange={() => handleSelection(value)}
                    />
                    <div className="radio-button">{value}</div>
                </label>
            ))}
        </div>
    );
}

export default RadioButtons;
