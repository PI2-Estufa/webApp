import { connect } from 'react-redux';
import PrivateRoute from '../components/PrivateRoute/PrivateRoute';

const mapStateToProps = (state) => {
    return {
        authenticated: state.application.authenticated
    }
}
export default connect(mapStateToProps)(PrivateRoute);