import axios from '../core/axios';

export function controlDrawer() {
    return () => axios.get('/drawer');
}