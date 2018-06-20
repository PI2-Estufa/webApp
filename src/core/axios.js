import axios from 'axios';

const baseUrl = 'http://localhost:8000';

axios.defaults.baseURL = baseUrl;

export default axios;
