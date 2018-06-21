const initialState = {
    authenticated: false,
    loginError: false,
    token: ''
};

export function applicationReducer(state=initialState, action) {
    switch (action.type) {
        case 'AUTHENTICATE':
            return {token: action.token, authenticated: true, loginError: false };
        case 'LOGIN_ERROR':
            return {...state, authenticated: false, loginError: true}
        default:
            return state;
    }
}