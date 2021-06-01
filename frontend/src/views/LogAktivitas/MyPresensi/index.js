import { connect } from "react-redux";
import MyPresensi from "./MyPresensi";

const mapStateToProps = state => ({
  user: state.auth.user
})


export default connect(mapStateToProps, null)(MyPresensi)