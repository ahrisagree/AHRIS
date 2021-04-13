import Home from "./views/Home";
import Profil from "./views/Profil";
import Coba from "./views/Coba";


export default [
  {
    path: '/',
    exact: true,
    component: Home,
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
]