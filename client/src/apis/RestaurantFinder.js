import axios from 'axios';
// const apiPort = process.env.PORT || 3001;

export default axios.create({
  baseURL: `https://${window.location.hostname}/api/v1/restaurants`,
});