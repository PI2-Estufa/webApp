import React, { Component } from "react";
import { connect } from 'react-redux';
import { NavItem, Nav, NavDropdown, MenuItem } from "react-bootstrap";

class HeaderLinks extends Component {
  render() {
    const notification = (
      <div>
        <i className="fa fa-globe" />
        <b className="caret" />
        <span className="notification">{this.props.warnings.length}</span>
        <p className="hidden-lg hidden-md">Notificações</p>
      </div>
    );
    return (
      <div>
        <Nav>
          <NavDropdown
            eventKey={2}
            title={notification}
            noCaret
            id="basic-nav-dropdown"
          >
          { this.props.warnings.map((warning, index) => {
            return (
              <MenuItem key={index} eventKey={2.1}>{warning.message}</MenuItem>
            );
          })
          }
          </NavDropdown>
        </Nav>
        <Nav pullRight>
          <NavItem eventKey={1} href="#">
            Account
          </NavItem>
          <NavItem eventKey={3} href="/logout">
            Log out
          </NavItem>
        </Nav>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    warnings: state.dashboard.warnings
  }
};
export default connect(mapStateToProps)(HeaderLinks);
