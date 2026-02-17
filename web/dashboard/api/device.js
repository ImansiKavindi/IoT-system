import axios from 'axios';

const API_BASE = 'http://localhost:3000'; // your backend URL

export const controlRelay = async (id, state) => {
  return axios.post(`${API_BASE}/device/control`, { id, state });
};
