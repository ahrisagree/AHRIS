import { connect } from "react-redux";
import DetailLogAktivitas from "./DetailLogAktivitas";

const mapStateToProps = state => ({
  user: state.auth.user
})


export default connect(mapStateToProps, null)(DetailLogAktivitas)