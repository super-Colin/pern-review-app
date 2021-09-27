import axios from 'axios';
const apiUrl = process.env.URL || 'localhost';
const apiPort = process.env.SERVER_PORT || 3001;

export default axios.create({
  baseURL: `http://${apiUrl}:${apiPort}/v1/api/restaurants`,
});