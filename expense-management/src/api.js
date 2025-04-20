import axios from 'axios';

// Create an Axios instance with default config
const api = axios.create({
  baseURL: 'http://localhost:8080',
  headers: {
    'Content-Type': 'application/json',
  },
  // Include credentials for CORS
  withCredentials: true
});

// Add request interceptor for debugging
api.interceptors.request.use(
  config => {
    console.log('API Request:', config);
    return config;
  },
  error => {
    console.error('API Request Error:', error);
    return Promise.reject(error);
  }
);

// Add response interceptor for debugging
api.interceptors.response.use(
  response => {
    console.log('API Response:', response);
    return response;
  },
  error => {
    // Important: Log the full error to see what's happening
    console.error('API Error Response:', error);
    
    // Special case for CORS errors which won't have a response
    if (error.message === 'Network Error') {
      console.error('This might be a CORS issue - check your backend CORS configuration');
    }
    
    return Promise.reject(error);
  }
);

export default api; 