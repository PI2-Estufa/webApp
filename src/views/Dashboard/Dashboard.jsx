import React, { Component } from "react";
import { Grid, Row, Col } from "react-bootstrap";
import Slider from 'react-slick';
import { Link } from 'react-router-dom';

import { StatsCard } from "components/StatsCard/StatsCard.jsx";
import './styles.css';
import { baseUrl } from "../../core/axios";
import { controlDrawer } from "../../actions/drawer";

const settings = {
  dots: true,
  infinite: true,
  speed: 500,
  slidesToShow: 1,
  slidesToScroll: 1,
  className: 'slider'
};

export default (props) => {
  return (
    <div className="content">
      <Grid fluid>
        <Row>
          <Col sm={12} md={6}>
            <Col lg={6} sm={6}>
              <StatsCard
                bigIcon={<i className="fas fa-thermometer-three-quarters text-danger" />}
                statsText="Temperatura"
                statsValue={`${props.sensors.temperature} ºC`}
                statsIcon={<i className="fas fa-file-alt" />}
                statsIconText={<Link to="/relatorio/temperatures">Relatório</Link>}
              />
            </Col>
            <Col lg={6} sm={6}>
              <StatsCard
                bigIcon={<i className="pe-7s-drop text-info" />}
                statsText="Umidade"
                statsValue={`${props.sensors.humidity} %`}
                statsIcon={<i className="fa fa-file-alt" />}
                statsIconText={<Link to="/relatorio/humidities">Relatório</Link>}
              />
            </Col>
            <Col lg={6} sm={6}>
              <StatsCard
                bigIcon="pH"
                statsText="pH da água"
                statsValue={props.sensors.ph}
                statsIcon={<i className="fa fa-file-alt" />}
                statsIconText={<Link to="/relatorio/phs">Relatório</Link>}
              />
            </Col>
            <Col lg={6} sm={6}>
              <StatsCard
                bigIcon={<i className="fa fa-tint text-danger" />}
                statsText="Temp. Água"
                statsValue={props.sensors.waterTemperature}
                statsIcon={<i className="fa fa-file-alt" />}
                statsIconText={<Link to="/relatorio/water_temperatures">Relatório</Link>}
              />
            </Col>
            {/* <Col lg={6} sm={6}>
              <StatsCard
                bigIcon={<i className="pe-7s-repeat text-info" />}
                statsText="Nível da água"
                statsValue={props.createOnlyLegend(props.waterLegend(props.sensors.waterLevel))}
              />
            </Col> */}
            <Col lg={6} sm={6}>
              <StatsCard
                bigIcon={<i className="pe-7s-light " style={{ color: "#F0F012" }} />}
                statsText="Luminosidade"
                statsValue={props.sensors.ilumination ? "Aceso" : "Apagado"}
              />
            </Col>
            <Col lg={6} sm={6}>
              <StatsCard
                bigIcon={<i className={props.modifyIcon(props.sensors.drawerStatus)} />}
                statsText="Gaveta"
                statsValue="Abrir"
                statsIcon={<i className="fa fa-file-alt" />}
                statsIconText={
                  <button
                    style={{ background: 'none', border: 'none', color: '#1DC7EA'}}
                    onClick={() => props.dispatch(controlDrawer())}
                  >
                    Abrir
                  </button>
                }
              />
            </Col>
          </Col>
          <Col sm={12} md={6} style={{ overflow: 'hidden' }}>
            <div>
              <img
                style={{ width: '100%', height: '100%' }}
                className="rotateimage"
                src={`${baseUrl}/pictures/${props.image}`}
              />
            </div>
          </Col>
        </Row>
      </Grid>
    </div >
  );
}
