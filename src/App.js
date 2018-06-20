import React from "react";
import ReactDOM from "react-dom";
import { Provider } from "react-redux";

import PrivateRoute from 'containers/PrivateRoute';

import { BrowserRouter, Route, Switch } from "react-router-dom";
import indexRoutes from "routes/index.jsx";
import store from "reducers/store";

import "bootstrap/dist/css/bootstrap.min.css";
import "./assets/css/animate.min.css";
import "./assets/sass/light-bootstrap-dashboard.css?v=1.2.0";
import "./assets/css/demo.css";
import "./assets/css/pe-icon-7-stroke.css";
import Login from "./containers/Login";

export default () => {
  return (
    <Provider store={store}>
      <BrowserRouter>
        <Switch>
          <Route path="/login" component={Login} />
          {indexRoutes.map((prop, key) => {
            return <PrivateRoute to={prop.path} component={prop.component} key={key} />;
            })}
        </Switch>
      </BrowserRouter>
    </Provider>
  )
};
