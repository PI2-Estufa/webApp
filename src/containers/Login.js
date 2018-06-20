import React from 'react';
import Login from '../views/Login/Login';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';


class LoginContainer extends React.Component {
    render() {
        if (this.props.authenticated)
            return <Redirect to="/dashboard" />;

        return <Login {...this.props} />;
    }
}

const mapStateToProps = (state) => {
    return {
        authenticated: state.application.authenticated
    }
}

export default connect(mapStateToProps)(LoginContainer);