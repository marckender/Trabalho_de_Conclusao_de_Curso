import React, { useState, useEffect, useRef, ReactNode } from 'react';
import './styles.scss';
import { FaAngleDown, FaAngleUp } from 'react-icons/fa';

interface DropdownProps {
  children: ReactNode;
  contentWidth: string;
  renderContent: () => ReactNode;
  hideToggle?: boolean;
}

const Dropdown: React.FC<DropdownProps> = ({ children, contentWidth, renderContent, hideToggle }) => {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  const toggleDropdown = () => {
    setIsOpen(!isOpen);
  };

  useEffect(() => {
    const handleOutsideClick = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };

    document.addEventListener('mousedown', handleOutsideClick);

    return () => {
      document.removeEventListener('mousedown', handleOutsideClick);
    };
  }, []);

  return (
    <div className={`dropdown ${isOpen ? 'open' : ''}`} ref={dropdownRef}>
      <div className="dropdown-header" onClick={toggleDropdown}>
        {children}
        <span>
        { !hideToggle &&
        <>
        {isOpen ? <FaAngleUp className="dropdown-icon" /> : <FaAngleDown className="dropdown-icon" />}
        </>
        }
        </span>
      </div>
      {isOpen && (
        <div className="dropdown-content" style={{ width: contentWidth }}>
          {renderContent()}
        </div>
      )}
    </div>
  );
};

export default Dropdown;