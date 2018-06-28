import axios from 'axios';

export const baseUrl = 'http://localhost:8000';

axios.defaults.baseURL = baseUrl;

export default axios;
