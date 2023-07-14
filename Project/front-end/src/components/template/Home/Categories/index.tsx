import React from 'react';
import './styles.scss';

const Categories: React.FC = () => {
  return (
    <div>
        <h1 className="categories_title">Categories</h1>
    <div className="responsive-cards-container">
      <div className="card">
        <div className="background-image"></div>
        <button className="centered-button">Braids</button>
      </div>

      <div className="card">
        <div className="background-image"></div>
        <button className="centered-button">Lace</button>
      </div>
    </div>
    </div>
  );
};

export default Categories;
