import React from 'react';
import Login from '../views/Login/Login';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';
import { authenticate } from '../actions/application';


class LoginContainer extends React.Component {
    componentDidMount() {
        const div = document.getElementById('root')
        // div.classList.add('login');
    }
    handleSubmit(event) {
        event.preventDefault();
        const username = event.target[0].value;
        const password = event.target[1].value;
        this.props.dispatch(authenticate(username, password))
    }
    render() {
        if (this.props.authenticated)
            return <Redirect to="/dashboard" />;

        return (
            <Login
                {...this.props}
                handleSubmit={this.handleSubmit.bind(this)}
            />
        );
    }
}

const mapStateToProps = (state) => {
    return {
        authenticated: state.application.authenticated,
        loginError: state.application.loginError
    }
}

export default connect(mapStateToProps)(LoginContainer);