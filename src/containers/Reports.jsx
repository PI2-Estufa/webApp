import React, { Component } from "react";
import { connect } from 'react-redux';
import TableList from "views/TableList/TableList";
import { fetchReport } from "../actions/reports";


class ReportContainer extends Component {
    constructor(props) {
        super(props);
        this.state = {
            activeFilter: 'day'
        }
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
    fetchTemperatures(queryString = '') {
        const path = this.props.match.params.report;
        this.props.dispatch(fetchReport(path, queryString));
        if (queryString !== '') {
            this.setState({ activeFilter: queryString.split('=')[1] })
        }

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
        const chartData = {
            labels: this.props.report.map((r) => r.date),
            datasets: [{
                data: this.props.report.map((r) => r.value),
                backgroundColor: [
                    'rgba(255, 99, 132, 0.2)',
                ],
            }]
        };
        const chartOptions = {
            legend: {
                display: false
            },
            scales: {
                xAxes: [{
                    display: false
                }]
            }
        };
        return (
            <TableList
                {...this.props}
                title={title}
                activeFilter={this.state.activeFilter}
                fetchTemperatures={this.fetchTemperatures}
                chartData={chartData}
                chartOptions={chartOptions}
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