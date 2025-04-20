import React from 'react';

export function Button({ children, onClick }) {
  return (
    <button onClick={onClick} style={{
      padding: '10px 16px',
      borderRadius: '8px',
      border: 'none',
      backgroundColor: '#007bff',
      color: '#fff',
      cursor: 'pointer',
      fontWeight: 'bold'
    }}>
      {children}
    </button>
  );
}
