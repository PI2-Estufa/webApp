const initialState = {
    "warnings": []
};
export function dashboardReducer(state=initialState, action) {
    switch(action.type) {
        case 'ADD_WARNINGS':
            return {...state, warnings: action.warnings};
        default:
            return state;
    }
}