import { connect } from "react-redux";
import HasilPerforma from "./HasilPerforma";
import DaftarHasilPerforma from "./DaftarHasilPerforma"

const mapStateToProps = state => ({
  user: state.auth.user
})


export default connect(mapStateToProps, null)(DaftarHasilPerforma)