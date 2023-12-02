import React from 'react';
import './styles.scss';
import { TbArrowBack } from 'react-icons/tb';

interface TitleProps {
  title?: string;
  onBackClick?: () => void;
  rightButton?: React.ReactNode;
}

const PagesHeader: React.FC<TitleProps> = ({ title, onBackClick, rightButton }) => {
  return (
    <div className="title-container">
        <div>{
                title 
                ? 
                    <h1 className="title">{title}</h1>
                :
                <span style={{color: 'black'}}>
                  <TbArrowBack className="back-button" onClick={onBackClick} color="black"/> 
                  Retour
                </span>
            }
         {/* <button className="back-button" onClick={onBackClick}>
            Voltar
        </button> */}
        </div>
      {rightButton && <div className="right-button">{rightButton}</div>}
    </div>
  );
};

export default PagesHeader;