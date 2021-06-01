import { connect } from "react-redux";
import DaftarLogKaryawan from "./DaftarLogKaryawan";

const mapStateToProps = state => ({
  user: state.auth.user
})


export default connect(mapStateToProps, null)(DaftarLogKaryawan)