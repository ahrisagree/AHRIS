import Home from "./views/Home";
import Register from "./views/Register";

export default [
  {
    path: '/',
    exact: true,
    component: Home,
  },
  {
    path: "/register",
    exact: true,
    component: Register,
  },
]