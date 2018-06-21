import axios from '../core/axios';


export function saveCredentials(token) {
    return {
        type: 'AUTHENTICATE',
        token
    };
}

export function loginError() {
    return {
        type: 'LOGIN_ERROR'
    }
}

export function authenticate(username, password) {
    return (dispatch) => {
        axios.post('/auth', {
            username,
            password
        })
        .then(response => {
            dispatch(saveCredentials(response.data.access_token));
        })
        .catch(() => {
            dispatch(loginError());
        });
    }
}