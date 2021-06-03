import { connect } from "react-redux";
import DaftarHasilPerforma from "./DaftarHasilPerforma"

const mapStateToProps = state => ({
  user: state.auth.user
})


export default connect(mapStateToProps, null)(DaftarHasilPerforma)