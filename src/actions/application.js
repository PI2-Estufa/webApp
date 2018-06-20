import axios from '../core/axios';

export function authenticate(username, password) {
    return () => {
        axios.post('/login', {
            username,
            password
        })
        .then(response => {
            console.log(response.data);
        });
    }
}