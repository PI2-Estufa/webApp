const initialState = {
    authenticated: false,
    token: ''
};

export function applicationReducer(state=initialState, action) {
    switch (action.type) {
        case 'AUTHENTICATE':
            return {token: action.token, authenticated: true };
        default:
            return state;
    }
}