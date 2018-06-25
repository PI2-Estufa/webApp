import axios from 'axios';

export const baseUrl = 'http://172.20.10.4:8000';

axios.defaults.baseURL = baseUrl;

export default axios;
