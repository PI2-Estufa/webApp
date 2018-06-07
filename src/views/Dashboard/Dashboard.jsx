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
  dataBar, optionsBar,
  responsiveBar,
  legendBar,
  legendTemperature
} from "variables/Variables.jsx";


let interval = null;
const min = 24.8;
const max = 26;

class Dashboard extends Component {
  constructor(props) {
    super(props);
    this.state = {
      temperatures: [],
      humidities: []
    }
    this.fetchTemperature = this.fetchTemperature.bind(this);
    this.temperatureData = this.temperatureData.bind(this);
  }

  componentDidMount() {
    this.fetchTemperature(this);
    interval = setInterval(this.fetchTemperature, 2000);
  }

  fetchTemperature() {
    fetch('http://localhost:8000')
      .then(response => response.json())
      .then(response => {
        this.setState({ temperatures: response.temperatures, humidities: response.humidities })
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
    const humidity = this.state.humidities[this.state.humidities.length -1];
    return (
      <div className="content">
        <Grid fluid>
          <Row>
            <Col lg={3} sm={6}>
              <StatsCard
                bigIcon={<i className="fas fa-thermometer-three-quarters text-danger" />}
                statsText="Temperatura"
                statsValue={`${temperature} ºC`}
                statsIcon={<i className="fas fa-file-alt" />}
                statsIconText="Relatório"
              />
            </Col>
            <Col lg={3} sm={6}>
              <StatsCard
                bigIcon={<i className="pe-7s-drop text-info" />}
                statsText="Umidade"
                statsValue={`${humidity} %`}
                statsIcon={<i className="fa fa-file-alt" />}
                statsIconText="Relatório"
              />
            </Col>
            <Col lg={3} sm={6}>
              <StatsCard
                bigIcon={<div className="text-warning">pH</div>}
                statsText="pH da água"
                statsValue="4"
                statsIcon={<i className="fa fa-file-alt" />}
                statsIconText="Relatório"
              />
            </Col>
            <Col lg={3} sm={6}>
              <StatsCard
                bigIcon={<i className="pe-7s-repeat text-info" />}
                statsText="Nível da água"
                statsValue="5L"
                statsIcon={<i className="fa fa-file-alt" />}
                statsIconText="Relatório"
              />
            </Col>
            <Col lg={3} sm={6}>
              <StatsCard
                bigIcon={<i className="pe-7s-light " style={{color: "#F0F012"}}/>}
                statsText="Luminosidade"
                statsValue="Ligada"
                statsIcon={<i className="fa fa-file-alt" />}
                statsIconText="Relatório"
              />
            </Col>
            <Col lg={3} sm={6}>
              <StatsCard
                bigIcon={<i className="fa fa-tint text-danger"/>}
                statsText="Temp. Água"
                statsValue="22 ºC"
                statsIcon={<i className="fa fa-file-alt" />}
                statsIconText="Relatório"
              />
            </Col>
          </Row>
          <Row>
            <Col md={8}>
              <Card
                statsIcon="fa fa-history"
                id="chartHours"
                title="Variação de temperatura"
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
                title="Temperatura atual"
                category=""
                stats=""
                content={
                  <div style={{textAlign: "center"}}>
                    <h1 className={this.temperatureStatus(temperature)}>
                      <strong>{`${temperature} ºC`}</strong>
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

        </Grid>
      </div>
    );
  }
}

export default Dashboard;
