import React from 'react';

export function Card({ children }) {
  return (
    <div style={{
      border: '1px solid #ccc',
      padding: '1rem',
      borderRadius: '10px',
      boxShadow: '0 2px 6px rgba(0,0,0,0.1)',
      marginBottom: '1rem'
    }}>
      {children}
    </div>
  );
}
