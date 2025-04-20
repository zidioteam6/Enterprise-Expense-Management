import React, { useState, useEffect } from 'react';
import api from '../api';

export default function TestPage() {
  const [status, setStatus] = useState('Loading...');
  const [error, setError] = useState(null);
  
  useEffect(() => {
    const checkHealth = async () => {
      try {
        const response = await api.get('/api/health');
        setStatus(`Server is up! Response: ${JSON.stringify(response.data)}`);
      } catch (err) {
        console.error('Health check failed:', err);
        setError(`Error: ${err.message}`);
        setStatus('Failed to connect to server');
      }
    };
    
    checkHealth();
  }, []);
  
  return (
    <div style={{ padding: '20px' }}>
      <h1>API Connection Test</h1>
      <h2>Status: {status}</h2>
      {error && (
        <div style={{ color: 'red', marginTop: '20px' }}>
          <h3>Error Details:</h3>
          <pre>{error}</pre>
        </div>
      )}
      
      <div style={{ marginTop: '30px' }}>
        <h3>Troubleshooting Steps:</h3>
        <ol>
          <li>Make sure your backend is running on port 8080</li>
          <li>Check browser console for detailed error messages</li>
          <li>Verify your CORS configuration in the backend</li>
          <li>Try disabling any browser extensions temporarily</li>
        </ol>
      </div>
    </div>
  );
} 