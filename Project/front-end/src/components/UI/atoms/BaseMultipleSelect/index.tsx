import React, { useState, useEffect, useRef } from "react";
import { BiChevronDown } from "react-icons/bi";
import "./styles.scss";

type Option = {
  name: string;
  value: any;
};

type SelectProps = {
  options: Option[];
  title?: string;
  onSelect: (selectedOptions: Option[]) => void; // Retorna um array de Option
  defaultValues?: Option[]; // Recebe um array de Option como valor padrão
};

const BaseMultipleSelect: React.FC<SelectProps> = ({
  options,
  onSelect,
  title,
  defaultValues,
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedOptions, setSelectedOptions] = useState<Option[]>(
    defaultValues || []
  );
  const selectRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    setSelectedOptions(defaultValues || []);
  }, [defaultValues]);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        selectRef.current &&
        !selectRef.current.contains(event.target as Node)
      ) {
        setIsOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const toggleSelect = () => {
    setIsOpen(!isOpen);
  };

  const handleOptionSelect = (option: Option) => {
    const isSelected = selectedOptions.some(
      (selected) => selected.value === option.value
    );

    let updatedOptions: Option[] = [];

    if (isSelected) {
      updatedOptions = selectedOptions.filter(
        (selected) => selected.value !== option.value
      );
    } else {
      updatedOptions = [...selectedOptions, option];
    }

    setSelectedOptions(updatedOptions);
  };

  const handleConfirmSelection = () => {
    setIsOpen(false);
    onSelect(selectedOptions);
  };

  useEffect(() => {
    onSelect(selectedOptions);
  }, [isOpen])
  

  return (
    <div ref={selectRef} className={`select ${isOpen ? "open" : ""}`}>
      <p>
        {title} <span>*</span>
      </p>
      <div className="select-header" onClick={toggleSelect}>
        <span className="selected-option">
          {selectedOptions.length > 0
            ? selectedOptions.map((option) => option.name).join(", ")
            : "Choose an option"}
        </span>
        <BiChevronDown className={`toggle-icon ${isOpen ? "rotated" : ""}`} />
      </div>
      {isOpen && (
        <ul className="options-list">
          {options.map((option) => (
            <li
              key={option.value}
              className={`option ${
                selectedOptions.some(
                  (selected) => selected.value === option.value
                )
                  ? "selected"
                  : ""
              }`}
              onClick={() => handleOptionSelect(option)}
            >
              {option.name}
            </li>
          ))}
        </ul>
      )}
      {isOpen && (
        <button onClick={handleConfirmSelection}>Confirmar</button>
      )}
    </div>
  );
};

export default BaseMultipleSelect;
