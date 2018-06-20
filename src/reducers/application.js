const initialState = {
    authenticated: false
};

export function applicationReducer(state=initialState, action) {
    switch (action.type) {
        case 'AUTHENTICATE':
            return {...state, authenticated: true };
        default:
            return state;
    }
}