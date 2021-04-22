import { connect } from "react-redux";
import NavigationDrawer from "./NavigationDrawer";

const mapStateToProps = state => ({
  user: state.auth.user
})

export default connect(mapStateToProps, null)(NavigationDrawer)