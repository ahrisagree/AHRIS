import { connect } from "react-redux";
import BuatPaketPertanyaan from "./BuatPaketPertanyaan";

const mapStateToProps = state => ({
  user: state.auth.user
})

export default connect(mapStateToProps, null)(BuatPaketPertanyaan);