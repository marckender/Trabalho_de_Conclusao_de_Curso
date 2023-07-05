import React, { useState } from "react";

import './styles.scss'

interface BaseInputProps {
    type: string;
    placeholder?:string;
    label?: string;
    required?: boolean;
    value?: string;
    onChange: (value: string) => void;
}


const BaseInput: React.FC<BaseInputProps> =({type, onChange, placeholder, label, required, value}) =>{

    const [, setInputValue] = useState<string>(value || "");

    const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const newValue = event.target.value;
        setInputValue(newValue);
        onChange(newValue);
    };
    return (
        <div className="base_input">
            <label>{label}</label>
            <input
             type={type}
             required={required}
             onChange={handleInputChange}
             value={value}
             placeholder={placeholder}
            />
        </div>
    )
}

export default BaseInput;