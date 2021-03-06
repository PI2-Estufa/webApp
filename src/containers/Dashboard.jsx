import React, { Component } from "react";
import { connect } from 'react-redux';
import Dashboard from "views/Dashboard/Dashboard.jsx";
import axios from "axios";
import { addWarnings } from "../actions/dashboard";

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
    await axios.get('', {
      headers: {
        authorization: `JWT ${this.props.token}`
      }
    })
      .then(response => {
        this.props.dispatch(addWarnings(response.data.warnings))
        this.setState({
          temperatures: response.data.temperatures,
          humidities: response.data.humidities,
          pHs: response.data.pHs,
          iluminations: response.data.iluminations,
          waterLevels: response.data.water_levels,
          waterTemperatures: response.data.water_temperatures,
          drawerStatuses: response.data.drawer_statuses,
          image: response.data.image
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
        image={this.state.image}
        createOnlyLegend={this.createOnlyLegend.bind(this)}
        modifyIcon={this.modifyIcon.bind(this)}
        waterLegend={this.waterLegend.bind(this)}
        drawerLegend={this.drawerLegend.bind(this)}
        changeGraph={this.changeGraph.bind(this)}
      />
    );
  }
}

const mapStateToProps = (state) => {
  return {
    token: state.application.token
  }
}

export default connect(mapStateToProps)(DashboardContainer);
