import React, { Component } from "react";
import { connect } from 'react-redux';
import TableList from "views/TableList/TableList";
import { fetchReport } from "../actions/reports";


class ReportContainer extends Component {
    constructor(props) {
        super(props);
        this.fetchTemperatures = this.fetchTemperatures.bind(this);
    }
    componentDidMount() {
        this.fetchTemperatures();
    }
    componentDidUpdate(newProps) {
        const oldReport = this.props.match.params.report;
        const newReport = newProps.match.params.report;
        if (oldReport !== newReport)
            this.fetchTemperatures();

    }
    fetchTemperatures() {
        const path = this.props.match.params.report;
        this.props.dispatch(fetchReport(path));
    }
    render() {
        const path = this.props.match.params.report;
        const titles = {
            temperatures: 'Temperatura',
            water_temperatures: 'Temperatura da água',
            phs: 'pH da água',
            humidities: 'Humidade',
        };
        const title = titles[path];
        return (
            <TableList
                {...this.props}
                title={title}
            />
        );
    }
}

const mapStateToProps = (state) => {
    return {
        report: state.report.results,
        average: state.report.average
    }
}

export default connect(mapStateToProps)(ReportContainer);