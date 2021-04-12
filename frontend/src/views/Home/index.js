import { connect } from 'react-redux';
import { logoutThunk } from 'thunk/auth';
import Home from './Home';

// const mapStateToProps = state => ({
// })

const mapActionToProps = {
  logoutThunk
}
export default connect(null, mapActionToProps)(Home);