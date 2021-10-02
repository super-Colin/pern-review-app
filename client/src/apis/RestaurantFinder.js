import axios from 'axios';
const apiPort = process.env.PORT || 3001;

export default axios.create({
  baseURL: `http://${window.location.hostname}:${apiPort}/api/v1/restaurants`,
});