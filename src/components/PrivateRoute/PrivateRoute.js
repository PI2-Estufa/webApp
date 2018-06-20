import React from 'react';
import { Route, Redirect } from 'react-router-dom';


export default ({component: Component, ...rest}) => {
    if (!rest.authenticated)
        return <Redirect to="/login" />

    return (
        <Route {...rest} component={(props) => <Component {...props} />} />
    );
}