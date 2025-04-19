import React from 'react';
import './GlassContainer.css'; // Styling in separate file

const GlassContainer = ({ title, children }) => {
  return (
    <div className="glass-container">
      <h1 className="glass-title">{title}</h1>
      {children && <div className="glass-content">{children}</div>}
    </div>
  );
};

export default GlassContainer;
