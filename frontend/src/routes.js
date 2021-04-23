import BuatPaketPertanyaan from "views/BuatPaketPertanyaan";
import Home from "./views/Home";
import Login from "./views/Login";
import Profil from "./views/Profil";
import Coba from "./views/Coba";

import Register from "./views/Register";
import DaftarKaryawan from "views/DaftarKaryawan";
import DaftarPaketPertanyaan from "views/DaftarPakerPertanyaan";
import AssignPaket from "./views/AssignPaket";
import AssignResponden from "views/AssignResponden";
import AssignPenerima from "views/AssignPenerima";

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
  {
    path: '/paket-pertanyaan',
    exact: true,
    component: DaftarPaketPertanyaan,
  },
  {
    path: '/paket-pertanyaan/add',
    exact: true,
    component: BuatPaketPertanyaan,
  },
  {
    path: '/akun',
    exact: true,
    component: DaftarKaryawan,
  },
  {
    path: '/assign',
    exact: true,
    component: AssignPaket,
  },
  {
    path: '/assign/penerima/responden',
    exact: true,
    component: AssignResponden,
  },
  {
    path: '/assign/penerima/',
    exact: true,
    component: AssignPenerima,
  }
]