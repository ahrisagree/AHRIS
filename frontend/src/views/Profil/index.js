import { connect } from 'react-redux';
import { logoutThunk } from 'thunk/auth';
import Profil from './Profil';

// const mapStateToProps = state => ({
// })

const mapActionToProps = {
  logoutThunk
}

export default connect(null, mapActionToProps)(Profil);