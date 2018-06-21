import React from "react";
import { Grid, Row, Col, Table } from "react-bootstrap";

import Card from "components/Card/Card.jsx";
import CustomButton from "../../components/CustomButton/CustomButton";

export default (props) => {
  return (
    <div className="content">
      <Grid fluid>
        <Row>
          <Col md={12}>
            <Card
              title={props.title}
              category=""
              ctTableFullWidth
              ctTableResponsive
              content={
                <div>
                  <CustomButton
                    style={{ marginRight: 15}}
                    fill
                    bsStyle={props.activeFilter === 'day' ? 'primary' : 'info'}
                    onClick={() => props.fetchTemperatures('period=day')}
                  >
                    Dia
                  </CustomButton>
                  <CustomButton
                    style={{ marginRight: 15}}
                    fill
                    bsStyle={props.activeFilter === 'month' ? 'primary' : 'info'}
                    onClick={() => props.fetchTemperatures('period=month')}
                  >
                    Mês
                  </CustomButton>
                  <CustomButton
                    style={{ marginRight: 15}}
                    fill
                    bsStyle={props.activeFilter === 'year' ? 'primary' : 'info'}
                    onClick={() => props.fetchTemperatures('period=year')}
                  >
                    Ano
                  </CustomButton>
                  <Table striped hover>
                    <thead>
                      <tr>
                        <th>Média</th>
                        <td>{props.average}</td>
                      </tr>
                      <tr>
                        <th>Data</th>
                        <th>Valor</th>
                      </tr>
                    </thead>
                    <tbody>
                      {
                        props.report.map((report, index) => {
                          return (
                            <tr key={index}>
                              <td>{new Date(report.date).toLocaleString('pt-Br')}</td>
                              <td>
                                {report.value}
                              </td>
                            </tr>
                          );
                        })
                      }
                    </tbody>
                  </Table>
                </div>
              }
            />
          </Col>
        </Row>
      </Grid>
    </div>
  );
}

