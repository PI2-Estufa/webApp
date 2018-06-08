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
      humidities: [],
      pHs: [],
      iluminations: [],
      waterLevels: [],
      activeOption: "temperatures",
      activeGraph: []
    }

    this.fetchTemperature = this.fetchTemperature.bind(this);
    this.graphData = this.graphData.bind(this);
    this.changeGraph = this.changeGraph.bind(this);
  }

  componentDidMount() {
    this.fetchTemperature(this);
    interval = setInterval(this.fetchTemperature, 2000);
  }

  async fetchTemperature() {
    await fetch('http://localhost:8000')
      .then(response => response.json())
      .then(response => {
        this.setState({ temperatures: response.temperatures, 
          humidities: response.humidities,
          pHs: response.pHs,
          iluminations: response.iluminations,
          waterLevels: response.water_levels })
      });
      switch(this.state.activeOption) {
        case "temperatures":
          this.setState({ activeGraph: this.state.temperatures });
          break;
        default:
          this.setState({ activeGraph: this.state.humidities });
      }
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

  graphData() {
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
          data: this.state.activeGraph
        },
        {
          name: 'min',
          data: [min, min, min, min, min]
        }
      ]
    }
  }

  graphOptions() {
    const min = Math.min(...this.state.activeGraph);
    const max = Math.max(...this.state.activeGraph);
    return {
      low: min,
      high: max,
      showArea: false,
      height: "245px",
      axisX: {
        showGrid: false
      },
      lineSmooth: true,
      showLine: true,
      showPoint: true,
      fullWidth: true,
      chartPadding: {
        right: 50
      },
      series: {
        "min": {
          showPoint: false,
        },
        "max": {
          showPoint: false,
        }
      }
    };
  }

  changeGraph(graph) {
    this.setState({activeOption: graph});
  }
  
  render() {
    console.log(this.state.activeGraph);
    const temperature = this.state.temperatures[this.state.temperatures.length - 1];
    const humidity = this.state.humidities[this.state.humidities.length -1];
    const ph = this.state.pHs[this.state.pHs.length -1];
    const ilumination = this.state.iluminations[this.state.iluminations.length -1];
    const waterLevel = this.state.waterLevels[this.state.waterLevels.length -1];

    return (
      <div className="content">
        <Grid fluid>
          <Row>
            <Col lg={3} sm={6}>
              <StatsCard
                bigIcon={<button onClick={() => this.changeGraph('temperatures')}><i className="fas fa-thermometer-three-quarters text-danger" /></button>}
                statsText="Temperatura"
                statsValue={`${temperature} ºC`}
                statsIcon={<i className="fas fa-file-alt" />}
                statsIconText="Relatório"
              />
            </Col>
            <Col lg={3} sm={6}>
              <StatsCard
                bigIcon={<button onClick={() => this.changeGraph('humidities')}><i className="pe-7s-drop text-info" /></button>}
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
                statsValue={ph}
                statsIcon={<i className="fa fa-file-alt" />}
                statsIconText="Relatório"
              />
            </Col>
            <Col lg={3} sm={6}>
              <StatsCard
                bigIcon={<i className="pe-7s-repeat text-info" />}
                statsText="Nível da água"
                statsValue={waterLevel}
                statsIcon={<i className="fa fa-file-alt" />}
                statsIconText="Relatório"
              />
            </Col>
            <Col lg={3} sm={6}>
              <StatsCard
                bigIcon={<i className="pe-7s-light " style={{color: "#F0F012"}}/>}
                statsText="Luminosidade"
                statsValue={ilumination ? "Aceso" : "Apagado"}
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
                      data={this.graphData()}
                      type="Line"
                      options={this.graphOptions()}
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
