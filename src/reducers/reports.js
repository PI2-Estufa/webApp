const initialState = {
    results: [],
    average: 0
}
export function reportsReducers(state=initialState, action) {
    switch(action.type) {
        case 'ADD_REPORT':
            return {results: action.report, average: action.average};
        default:
            return state;
    }
}