import React, { Component } from "react";
import Dashboard from "views/Dashboard/Dashboard.jsx";

let interval = null;
const min = 24.8;
const max = 26;

class DashboardContainer extends Component {
  constructor(props) {
    super(props);
    this.state = {
      temperatures: [],
      humidities: [],
      pHs: [],
      iluminations: [],
      waterLevels: [],
      waterTemperatures: [],
      drawerStatuses: [],
      images: [],
      activeOption: "temperatures",
      activeGraph: []
    }
    this.fetchTemperature = this.fetchTemperature.bind(this);
  }

  componentDidMount() {
    this.fetchTemperature(this);
    interval = setInterval(this.fetchTemperature, 2000);
  }

  async fetchTemperature() {
    await fetch('http://localhost:8000')
      .then(response => response.json())
      .then(response => {
        this.setState({
          temperatures: response.temperatures,
          humidities: response.humidities,
          pHs: response.pHs,
          iluminations: response.iluminations,
          waterLevels: response.water_levels,
          waterTemperatures: response.water_temperatures,
          drawerStatuses: response.drawer_statuses,
          images: response.images
        })
      });
    switch (this.state.activeOption) {
      case "temperatures":
        this.setState({ activeGraph: this.state.temperatures });
        break;
      case "humidities":
        this.setState({ activeGraph: this.state.humidities });
        break;
      case "pHs":
        this.setState({ activeGraph: this.state.pHs });
        break;
      case "waterLevels":
        this.setState({ activeGraph: this.state.waterLevels });
        break;
      case "drawerStatuses":
        this.setState({ activeGraph: this.state.drawerStatuses });
        break;
      default:
        this.setState({ activeGraph: this.state.waterTemperatures });
    }
  }
  componentWillUnmount() {
    clearInterval(interval);
  }
  createOnlyLegend(json) {
    var legend = [];
    for (var i = 0; i < json["names"].length; i++) {
      legend.push(json["names"][i]);
    }
    return legend;
  }

  modifyIcon(drawerStatus) {
    if (drawerStatus == 0 || drawerStatus == 3)
      return "fa fa-toggle-off text-primary"
    return "fa fa-toggle-on text-primary"
  }
  waterLegend(waterLevel) {
    if (waterLevel == 0)
      return {
        names: ["Vazio"]
      }
    else if (waterLevel == 1)
      return {
        names: ["Mediano"]
      }

    return {
      names: ["Cheio"]
    }

  }
  drawerLegend(drawerStatus) {
    if (drawerStatus == 0)
      return {
        names: ["Fechado"]
      }
    else if (drawerStatus == 1)
      return {
        names: ["Aberto"]
      }
    else if (drawerStatus == 2)
      return {
        names: ["Abrindo"]
      }
    return {
      names: ["Fechando"]
    }
  }
  changeGraph(graph) {
    this.setState({ activeOption: graph });
  }

  render() {
    const sensors = {
      temperature: this.state.temperatures[0],
      humidity: this.state.humidities[0],
      ph: this.state.pHs[0],
      ilumination: this.state.iluminations[0],
      waterLevel: this.state.waterLevels[0],
      waterTemperature: this.state.waterTemperatures[0],
      drawerStatus: this.state.drawerStatuses[0],
    };
    return (
      <Dashboard
        {...this.props}
        sensors={sensors}
        images={this.state.images}
        createOnlyLegend={this.createOnlyLegend.bind(this)}
        modifyIcon={this.modifyIcon.bind(this)}
        waterLegend={this.waterLegend.bind(this)}
        drawerLegend={this.drawerLegend.bind(this)}
        changeGraph={this.changeGraph.bind(this)}
      />
    );
  }
}

export default DashboardContainer;
