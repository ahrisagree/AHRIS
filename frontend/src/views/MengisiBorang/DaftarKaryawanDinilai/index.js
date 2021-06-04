import { connect } from 'react-redux';
import DaftarKaryawanDinilai from './DaftarKaryawanDinilai';

const mapStateToProps = state => ({
  user: state.auth.user,
})

// const mapActionToProps = {
// }

export default connect(mapStateToProps, null)(DaftarKaryawanDinilai);