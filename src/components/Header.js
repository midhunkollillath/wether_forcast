import React from 'react';
import summerImg from '../assets/download.jpeg';

function Header() {
  return (
    <div className="header-container">
      <div className="header-content">
        <img 
          src={summerImg} 
          alt="Cloud Left" 
          className="header-image"
        />

        <div className="header-title">
          Weather Dashboard
        </div>

        <img 
          src={summerImg} 
          alt="Cloud Right" 
          className="header-image"
        />
      </div>
    </div>
  );
}

export default Header;
