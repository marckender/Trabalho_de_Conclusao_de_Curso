import React, { useState, useEffect } from 'react';
import './styles.scss';
import {AiOutlineCloseCircle} from "react-icons/ai"

interface DrawerProps {
  isOpen: boolean;
  onClose: () => void;
  children: React.ReactNode;
}

const Drawer: React.FC<DrawerProps> = ({ isOpen, onClose, children }) => {
  const [isDrawerOpen, setIsDrawerOpen] = useState(isOpen);

  useEffect(() => {
    if (isOpen) {
      setIsDrawerOpen(true);
    }
  }, [isOpen]);

  const handleClose = () => {
      onClose();
  };


  return (
    <>
      {isDrawerOpen && (
        <div
          className={`drawer ${isOpen ? 'open' : ''}`}
        >
          <div className="overlay" onClick={handleClose} />
          <div className="content">
            <button className="close-button" onClick={handleClose}>
            <AiOutlineCloseCircle size={30}/>
            </button>
            {children}
          </div>
        </div>
      )}
    </>
  );
};

export default Drawer;
