import React, { useState, useEffect } from "react";
import { BiChevronDown } from "react-icons/bi";
import "./styles.scss";

type Option = {
  name: string;
  value: any;
};

type SelectProps = {
  options: Option[];
  title?: string;
  onSelect: (value: Option) => void;
  defaultValue?: Option; // New prop for default value
};

const BaseSelect: React.FC<SelectProps> = ({
  options,
  onSelect,
  title,
  defaultValue,
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedOption, setSelectedOption] = useState<Option | null>(defaultValue || null);

  useEffect(() => {
    // Update selected option when defaultValue changes
    setSelectedOption(defaultValue || null);
  }, [defaultValue]);

  const toggleSelect = () => {
    setIsOpen(!isOpen);
  };

  const handleOptionSelect = (option: Option) => {
    setSelectedOption(option);
    setIsOpen(false);
    onSelect(option);
  };

  return (
    <div className={`select ${isOpen ? "open" : ""}`}>
      <p>
        {title} <span>*</span>
      </p>
      <div className="select-header" onClick={toggleSelect}>
        <span className="selected-option">
          {selectedOption ? selectedOption.name : "Choose an option"}
        </span>
        <BiChevronDown
          className={`toggle-icon ${isOpen ? "rotated" : ""}`}
        />
      </div>
      {isOpen && (
        <ul className="options-list">
          {options.map((option) => (
            <li
              key={option.value}
              className="option"
              onClick={() => handleOptionSelect(option)}
            >
              {option.name}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default BaseSelect;