import axios from 'core/axios';


export function addReport(report, average=0) {
    return {
        type: 'ADD_REPORT',
        report,
        average
    }
}
export function fetchReport(report='temperatures') {
    return (dispatch) => {
        axios.get(`/report/${report}`)
        .then(response => {
            if (response.data.error)
                throw "Hurra";

            dispatch(addReport(response.data.results, response.data.average));           
        })
        .catch(() => {
            console.log('CATCH');
            dispatch(addReport([]));
        })
    };
}