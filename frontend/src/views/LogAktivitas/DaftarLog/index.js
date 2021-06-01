import { connect } from "react-redux";
import DaftarLog from "./DaftarLog";

const mapStateToProps = state => ({
  user: state.auth.user
})


export default connect(mapStateToProps, null)(DaftarLog)