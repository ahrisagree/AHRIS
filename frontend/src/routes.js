import BuatPaketPertanyaan from "views/BuatPaketPertanyaan";
import Home from "./views/Home";
import Login from "./views/Login";
import Profil from "./views/Profil";
import Coba from "./views/Coba";
import LogAktivitas from "./views/LogAktivitas/LogAktivitas";
import DetailLogAktivitas from "./views/LogAktivitas/DetailLogAktivitas";
import DaftarLog from "./views/LogAktivitas/DaftarLog";
import Register from "./views/Register";
import DaftarKaryawan from "views/DaftarKaryawan";
import DaftarPaketPertanyaan from "views/DaftarPakerPertanyaan";
import DetailEditPaketPertanyaan from "views/DetailEditPaketPertanyaan";
import DaftarBorang from "views/MengisiBorang";
import EditLogAktivitas from "views/LogAktivitas/EditLogAktivitas";
import DetailEditUser from "views/DetailEditUser";
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
    path: '/coba',
    exact: true,
    component: Coba,
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
    path: '/paket-pertanyaan/:id',
    exact: true,
    component: DetailEditPaketPertanyaan,
  },
  {
    path: '/akun',
    exact: true,
    component: DaftarKaryawan,
  },
  {
    path: '/daftar-borang',
    exact: true,
    component: DaftarBorang
  },
  {
    path: '/log-aktivitas',
    exact: true,
    component: LogAktivitas
  },
  {
    path: '/daftar-log',
    exact: true,
    component: DaftarLog
  },
  {
    path: '/detail-log',
    exact: true,
    component: DetailLogAktivitas
  },
  {
    path: '/edit-log',
    exact: true,
    component: EditLogAktivitas
  },
  {
    path: '/akun/:idUser',
    exact: true,
    component: DetailEditUser
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
  },
]