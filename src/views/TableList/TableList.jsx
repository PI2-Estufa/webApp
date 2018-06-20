import React from "react";
import { Grid, Row, Col, Table } from "react-bootstrap";

import Card from "components/Card/Card.jsx";

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
              }
            />
          </Col>
        </Row>
      </Grid>
    </div>
  );
}

