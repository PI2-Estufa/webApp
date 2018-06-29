import axios from 'axios';

export const baseUrl = process.env.NODE_ENV == 'development' ? 'http://localhost:8000' : 'http://52.67.63.21:8000';

axios.defaults.baseURL = baseUrl;

export default axios;
