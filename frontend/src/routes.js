import Home from "./views/Home";
import Login from "./views/Login";
import Profil from "./views/Profil";
import Coba from "./views/Coba";

import Register from "./views/Register";

export default [
  {
    path: '/',
    exact: true,
    component: Home,
  },
  {
    path: '/login',
    exact: true,
    component: Login,
  },
  {
    path: '/profil',
    exact: true,
    component: Profil,
  },
  {
    path: '/coba',
    exact: true,
    component: Coba,
  },
  {
    path: "/register",
    exact: true,
    component: Register,
  },
]