import React from 'react'
import './styles.scss'


interface InputQuantityProps {
    label: string;
    name?: string;
    value?: number;
    decrement: () => void;
    increment: () => void;
    // onChange?: (value: number) => void;
    total?:number;
}

const InputQuantity: React.FC<InputQuantityProps> =({
    label,
    name,
    decrement,
    value,
    increment,
    total,
}) =>{

  return (
    <>
        <span className="label"> {label}: </span>
        <form className="count-inlineflex">
            <div className="qty-min" onClick={decrement}>-</div>
                <input disabled type="text" name={name} value={value}  className="qty" minLength={1}/>
            <div className="qty-max" onClick={increment}>+</div>
        </form>
        {total ? 
        <span className="label"> {total} available </span>
        :''}
    </>
  )
}

export default InputQuantity;