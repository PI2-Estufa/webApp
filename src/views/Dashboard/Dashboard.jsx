import React, { Component } from "react";
import ChartistGraph from "react-chartist";
import { Grid, Row, Col } from "react-bootstrap";

import { Card } from "components/Card/Card.jsx";
import { StatsCard } from "components/StatsCard/StatsCard.jsx";
import { Tasks } from "components/Tasks/Tasks.jsx";
import {
  dataPie,
  legendPie,
  dataSales,
  optionsSales,
  responsiveSales,
  legendSales,
  dataBar,
  optionsBar,
  responsiveBar,
  legendBar,
  legendTemperature
} from "variables/Variables.jsx";


let interval = null;
const min = 5;
const max = 25;

class Dashboard extends Component {
  constructor(props) {
    super(props);
    this.state = {
      temperatures: []
    }
    this.fetchTemperature = this.fetchTemperature.bind(this);
    this.temperatureData = this.temperatureData.bind(this);
  }

  componentDidMount() {
    this.fetchTemperature(this);
    interval = setInterval(this.fetchTemperature, 5000);
  }

  fetchTemperature() {
    fetch('http://localhost:8000')
      .then(response => response.json())
      .then(response => {
        this.setState({ temperatures: response.temperatures })
      });
  }
  componentWillUnmount() {
    clearInterval(interval);
  }
  createLegend(json) {
    var legend = [];
    for (var i = 0; i < json["names"].length; i++) {
      var type = "fa fa-circle text-" + json["types"][i];
      legend.push(<i className={type} key={i} />);
      legend.push(" ");
      legend.push(json["names"][i]);
    }
    return legend;
  }
  temperatureStatus(temperature) {
    if (temperature <= min)
      return "text-info";
    else if (temperature >= max)
      return "text-danger";

    return "text-success";

  }
  temperatureLegend(temperature) {
    if (temperature <= min)
      return {
        names: ["Baixa"],
        types: ["info"]
      }
    else if (temperature >= max)
      return {
        names: ["Elevada"],
        types: ["danger"]
      }

    return {
      names: ["Ideal"],
      types: ["success"]
    }
  }

  temperatureData() {
    return {
      "labels":
        ["t1", "t2", "t3", "t4", "t5"],
      "series": [
        {
          name: 'max',
          data: [max, max, max, max, max]
        },
        {
          name: 'temperature',
          data: this.state.temperatures
        },
        {
          name: 'min',
          data: [min, min, min, min, min]
        }
      ]
    }
  }

  render() {
    const temperature = this.state.temperatures[this.state.temperatures.length - 1];
    console.log(this.state.temperatures)
    return (
      <div className="content">
        <Grid fluid>
          <Row>
            <Col lg={3} sm={6}>
              <StatsCard
                bigIcon={<i className="pe-7s-server text-warning" />}
                statsText="Capacity"
                statsValue="105GB"
                statsIcon={<i className="fa fa-refresh" />}
                statsIconText="Updated now"
              />
            </Col>
            <Col lg={3} sm={6}>
              <StatsCard
                bigIcon={<i className="pe-7s-wallet text-success" />}
                statsText="Revenue"
                statsValue="$1,345"
                statsIcon={<i className="fa fa-calendar-o" />}
                statsIconText="Last day"
              />
            </Col>
            <Col lg={3} sm={6}>
              <StatsCard
                bigIcon={<i className="pe-7s-graph1 text-danger" />}
                statsText="Errors"
                statsValue="23"
                statsIcon={<i className="fa fa-clock-o" />}
                statsIconText="In the last hour"
              />
            </Col>
            <Col lg={3} sm={6}>
              <StatsCard
                bigIcon={<i className="fa fa-twitter text-info" />}
                statsText="Followers"
                statsValue="+45"
                statsIcon={<i className="fa fa-refresh" />}
                statsIconText="Updated now"
              />
            </Col>
          </Row>
          <Row>
            <Col md={8}>
              <Card
                statsIcon="fa fa-history"
                id="chartHours"
                title="Cinturão de Temperatura"
                category=""
                stats=""
                content={
                  <div className="ct-chart">
                    <ChartistGraph
                      data={this.temperatureData()}
                      type="Line"
                      options={optionsSales}
                      responsiveOptions={responsiveSales}
                    />
                  </div>
                }
              />
            </Col>
            <Col md={4}>
              <Card
                statsIcon="fa fa-clock-o"
                title="Temperatura também"
                category=""
                stats=""
                content={
                  <div style={{textAlign: "center"}}>
                    <h1 className={this.temperatureStatus(temperature)}>
                      <strong>{temperature}</strong>
                    </h1>
                  </div>
                }
                legend={
                  <div
                    className="legend"
                    style={{ textAlign: "center" }}
                  >
                    {this.createLegend(this.temperatureLegend(temperature))}
                  </div>
                }
              />
            </Col>
          </Row>

          <Row>
            <Col md={6}>
              <Card
                id="chartActivity"
                title="2014 Sales"
                category="All products including Taxes"
                stats="Data information certified"
                statsIcon="fa fa-check"
                content={
                  <div className="ct-chart">
                    <ChartistGraph
                      data={dataBar}
                      type="Bar"
                      options={optionsBar}
                      responsiveOptions={responsiveBar}
                    />
                  </div>
                }
                legend={
                  <div className="legend">{this.createLegend(legendBar)}</div>
                }
              />
            </Col>

            <Col md={6}>
              <Card
                title="Tasks"
                category="Backend development"
                stats="Updated 3 minutes ago"
                statsIcon="fa fa-history"
                content={
                  <div className="table-full-width">
                    <table className="table">
                      <Tasks />
                    </table>
                  </div>
                }
              />
            </Col>
          </Row>
        </Grid>
      </div>
    );
  }
}

export default Dashboard;
