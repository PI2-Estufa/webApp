import React, { Component } from "react";
import ChartistGraph from "react-chartist";
import { Grid, Row, Col } from "react-bootstrap";

import { Card } from "components/Card/Card.jsx";
import { StatsCard } from "components/StatsCard/StatsCard.jsx";
import './styles.css';


export default (props) => {
  return (
    <div className="content">
      <Grid fluid>
        <Row>
          <Col lg={4} sm={6}>
            <StatsCard
              bigIcon={<button className="button" onClick={() => props.changeGraph('temperatures')}><i className="fas fa-thermometer-three-quarters text-danger" /></button>}
              statsText="Temperatura"
              statsValue={`${props.sensors.temperature} ºC`}
              statsIcon={<i className="fas fa-file-alt" />}
              statsIconText="Relatório"
            />
          </Col>
          <Col lg={4} sm={6}>
            <StatsCard
              bigIcon={<button className="button" onClick={() => props.changeGraph('humidities')}><i className="pe-7s-drop text-info" /></button>}
              statsText="Umidade"
              statsValue={`${props.sensors.humidity} %`}
              statsIcon={<i className="fa fa-file-alt" />}
              statsIconText="Relatório"
            />
          </Col>
          <Col lg={4} sm={6}>
            <StatsCard
              bigIcon={<button className="button" onClick={() => props.changeGraph('pHs')}>pH<i className="text-warning" /></button>}

              statsText="pH da água"
              statsValue={props.sensors.ph}
              statsIcon={<i className="fa fa-file-alt" />}
              statsIconText="Relatório"
            />
          </Col>
          <Col lg={4} sm={6}>
            <StatsCard
              bigIcon={<button className="button" onClick={() => props.changeGraph('waterLevels')}><i className="pe-7s-repeat text-info" /></button>}

              statsText="Nível da água"
              statsValue={props.createOnlyLegend(props.waterLegend(props.sensors.waterLevel))}

              statsIcon={<i className="fa fa-file-alt" />}
              statsIconText="Relatório"
            />
          </Col>
          <Col lg={4} sm={6}>
            <StatsCard
              bigIcon={<button className="button"><i className="pe-7s-light " style={{ color: "#F0F012" }} /></button>}
              statsText="Luminosidade"
              statsValue={props.sensors.ilumination ? "Aceso" : "Apagado"}
              statsIcon={<i className="fa fa-file-alt" />}
              statsIconText="Relatório"
            />
          </Col>
          <Col lg={4} sm={6}>
            <StatsCard
              bigIcon={<button className="button" onClick={() => props.changeGraph('waterTemperatures')}><i className="fa fa-tint text-danger" /></button>}
              statsText="Temp. Água"
              statsValue={props.sensors.waterTemperature}
              statsIcon={<i className="fa fa-file-alt" />}
              statsIconText="Relatório"
            />
          </Col>
          <Col lg={4} sm={6}>
            <StatsCard
              bigIcon={<button className="button" onClick={() => props.changeGraph('drawerStatuses')}><i className={props.modifyIcon(props.sensors.drawerStatus)} /></button>}
              statsText="Estado da gaveta"
              statsValue={props.createOnlyLegend(props.drawerLegend(props.drawerStatus))}
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
                    data={props.graphData()}
                    type="Line"
                    options={props.graphOptions()}
                    responsiveOptions={props.responsiveSales}
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
                <div style={{ textAlign: "center" }}>
                  <h1 className={props.temperatureStatus(props.temperature)}>
                    <strong>{`${props.sensors.temperature} ºC`}</strong>
                  </h1>
                </div>
              }
              legend={
                <div
                  className="legend"
                  style={{ textAlign: "center" }}
                >
                  {props.createLegend(props.temperatureLegend(props.temperature))}
                </div>
              }
            />
          </Col>
        </Row>

      </Grid>
      <img
        src={
          "http://localhost:8000/pictures/" + props.image
        }
      />
    </div>
  );
}
