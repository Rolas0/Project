import React from 'react';

function Options({ name, id, value, data, text, handleChange }) {
    return (
        <select name={name} id={id} value={value} onChange={handleChange}>
            <option>{text}</option>
            {data.map((option) => {
                return (
                    <option key={option._id} value={option._id}>
                        {option.name} {option.price}
                    </option>
                );
            })}
        </select>
    );
}

export default Options;
