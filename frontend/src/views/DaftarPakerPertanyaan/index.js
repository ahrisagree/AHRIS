import { connect } from "react-redux";
import DaftarPaketPertanyaan from "./DaftarPaketPertanyaan";

const mapStateToProps = state => ({
  user: state.auth.user
})

export default connect(mapStateToProps, null)(DaftarPaketPertanyaan);