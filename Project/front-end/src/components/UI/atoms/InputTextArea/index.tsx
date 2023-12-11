import React, { useState } from 'react'
import "./styles.scss"

interface InputTextareaProps {
    placeholder?:string;
    label?: string;
    value?: string;
    onInput: (value: string) => void;
}
const InputTextarea: React.FC<InputTextareaProps> =({ onInput, placeholder, label, value}) =>{
    const [, setInputValue] = useState<string>(value ?? "");

    const handleInputChange = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
        const newValue = event.target.value;
        setInputValue(newValue);
        onInput(newValue);
    };
    return (
        <div className="Custom_textarea">
            <label>{label} <span>*</span></label>
            <textarea
             onInput={handleInputChange}
             value={value}
             placeholder={placeholder}
            />
        </div>
    )
}

export default InputTextarea;