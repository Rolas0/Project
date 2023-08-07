import React from 'react';
import './Button.scss';

function Button({ type, text, style, onClick }) {
    return (
        <button
            className={`btn ${style}`}
            type={type}
            // style={style}
            onClick={onClick}
        >
            {text}
        </button>
    );
}

export default Button;
