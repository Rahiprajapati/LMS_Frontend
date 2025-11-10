import axios from 'axios';

const baseURL = process.env.REACT_APP_API_URL || 'https://lms-backend-red-five.vercel.app';

const api = axios.create({
  baseURL,
  withCredentials: true,
});

export default api;
