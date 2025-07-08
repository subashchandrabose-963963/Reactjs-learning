import React from 'react';

const Button = (props) => {
    console.log("Button component rendered with props:", props);
    return (
        <div>
            <button className="bg-green-800 text-white p-3 rounded-md ml-5 mt-3">{props.label}</button>
        </div>
    );
};

export default Button;