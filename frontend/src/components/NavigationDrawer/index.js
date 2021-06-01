import { connect } from "react-redux";
import { logoutThunk } from "thunk/auth";
import NavigationDrawer from "./NavigationDrawer";

const mapStateToProps = state => ({
  user: state.auth.user
})

const mapActionToProps = {
  logoutThunk
}


export default connect(mapStateToProps, mapActionToProps)(NavigationDrawer)