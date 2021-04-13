import { connect } from 'react-redux';
import { loginThunk } from 'thunk/auth';
import Login from './Login'

const mapStateToProps = state => ({
   ...state.auth
});

const mapActionToProps = {
  loginThunk
}

export default connect(
  mapStateToProps,
  mapActionToProps
)(Login);