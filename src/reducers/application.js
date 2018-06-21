const initialState = {
    authenticated: true,
    loginError: false,
    token: 'eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJleHAiOjE1Mjk2MjI4MDUsImlhdCI6MTUyOTYxOTIwNSwibmJmIjoxNTI5NjE5MjA1LCJpZGVudGl0eSI6MTAwMH0.Cb6XtfyRh5sxrA-29H27m3iKjE0C4oUYXfskJOzUTb8'
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