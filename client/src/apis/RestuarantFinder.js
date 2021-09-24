import axios from 'axios';
const apiUrl = process.env.API_URL || 'localhost';
const apiPort = process.env.API_Port || 3001;

export default axios.create({
  baseURL: `http://${apiUrl}:${apiPort}/v1/api/restaurants`,
});