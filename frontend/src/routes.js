import { ROLE } from "utils/constant";
import BuatPaketPertanyaan from "views/BuatPaketPertanyaan";
import Home from "./views/Home";
import Login from "./views/Login";
import Profil from "./views/Profil";
import LogAktivitas from "./views/LogAktivitas/LogAktivitas";
import DaftarLogKaryawan from "./views/LogAktivitas/DaftarLogKaryawan/";
import DetailLogAktivitas from "./views/LogAktivitas/DetailLogAktivitas/";
import DaftarLog from "./views/LogAktivitas/DaftarLog/";
import MyPresensi from "./views/LogAktivitas/MyPresensi/";
import Register from "./views/Register";
import DaftarKaryawan from "views/DaftarKaryawan";
import DaftarPaketPertanyaan from "views/DaftarPakerPertanyaan";
import DetailEditPaketPertanyaan from "views/DetailEditPaketPertanyaan";
import DaftarBorang from "views/MengisiBorang/DaftarBorang";
import DaftarKaryawanDinilai from "views/MengisiBorang/DaftarKaryawanDinilai"
import MengisiBorang from "views/MengisiBorang/MengisiBorang";
import EditLogAktivitas from "views/LogAktivitas/EditLogAktivitas";
import DetailEditUser from "views/DetailEditUser";
import DaftarKaryawanPerforma from "views/KelolaHasilPerforma/DaftarKaryawanPerforma";
import DaftarBorangPerforma from "views/KelolaHasilPerforma/DaftarBorangPerforma";
import AssignmentManager from "views/AssignmentManager";
import EvaluasiDiri from "views/EvaluasiDiri";
import Pembobotan from "views/KelolaHasilPerforma/Pembobotan";
import DaftarHasilPerforma from "views/HasilPerforma/index";
import HasilPerforma from "views/HasilPerforma/HasilPerforma";
import EvaluasiPerforma from "views/EvaluasiPerforma";
import DaftarEvaluasiPerforma from "views/DaftarEvaluasiPerforma";
import KelolaGaji from "views/KelolaGaji";
import NoPage from "views/NoPage";

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
    path: "/akun/register",
    exact: true,
    component: Register,
    access: [ROLE.admin]
  },
  {
    path: '/paket-pertanyaan',
    exact: true,
    component: DaftarPaketPertanyaan,
    access: [ROLE.admin, ROLE.manager]
  },
  {
    path: '/paket-pertanyaan/add',
    exact: true,
    component: BuatPaketPertanyaan,
    access: [ROLE.admin]
  },
  {
    path: '/paket-pertanyaan/:id',
    exact: true,
    component: DetailEditPaketPertanyaan,
    access: [ROLE.admin, ROLE.manager]
  },
  {
    path: '/paket-pertanyaan/:id/edit',
    exact: true,
    component: DetailEditPaketPertanyaan,
    access: [ROLE.admin]
  },
  {
    path: '/akun',
    exact: true,
    component: DaftarKaryawan,
    access: [ROLE.admin]
  },
  {
    path: '/mengisi-borang/:id',
    exact: true,
    component: DaftarBorang,
    access: [ROLE.admin, ROLE.manager, ROLE.karyawan]
  },
  {
    path: '/mengisi-borang',
    exact: true,
    component: DaftarKaryawanDinilai,
    access: [ROLE.admin, ROLE.manager, ROLE.karyawan]
  },
  {
    path: '/mengisi-borang/:id/:idPaket',
    exact: true,
    component: MengisiBorang,
    access: [ROLE.admin, ROLE.manager, ROLE.karyawan]
  },
  {
    path: '/log-aktivitas',
    exact: true,
    component: LogAktivitas,
    access: [ROLE.manager, ROLE.karyawan]
  },
  {
    path: '/log',
    exact: true,
    component: DaftarLog,
    access: [ROLE.manager, ROLE.karyawan]
  },
  {
    path: '/log/daftar-log-karyawan',
    exact: true,
    component: DaftarLogKaryawan,
    access: [ROLE.manager]
  },
  {
    path: '/log/daftar-log-karyawan/:id',
    exact: true,
    component: DetailLogAktivitas,
    access: [ROLE.manager]
  },
  {
    path: '/log/:id',
    exact: true,
    component: DetailLogAktivitas,
    access: [ROLE.manager, ROLE.karyawan]
  },
  {
    path: '/log/:id/edit',
    exact: true,
    component: EditLogAktivitas,
    access: [ROLE.manager, ROLE.karyawan]
  },
  {
    path: '/kelola-performa',
    exact: true,
    component: DaftarKaryawanPerforma,
    access: [ROLE.admin]
  },
  {
    path: '/kelola-performa/:idDinilai',
    exact: true,
    component: DaftarBorangPerforma,
    access: [ROLE.admin]
  },
  {
    path: '/kelola-performa/:idDinilai/:idPaket',
    exact: true,
    component: Pembobotan,
    access: [ROLE.admin]
  },
  {
    path: '/akun/:idUser',
    exact: true,
    component: DetailEditUser,
    access: [ROLE.admin]
  },
  {
    path: '/my-presensi',
    exact: true,
    component: MyPresensi
  },
  {
    path: '/assign',
    exact: true,
    component: AssignmentManager,
    access: [ROLE.admin]
  },
  {
    path: '/hasil-performa',
    exact: true,
    component: DaftarHasilPerforma,
    access: [ROLE.admin, ROLE.karyawan, ROLE.manager]
  },
  {
    path: '/hasil-performa/:id',
    exact: true,
    component: HasilPerforma,
    access: [ROLE.admin, ROLE.karyawan, ROLE.manager]
  },
  {
    path: '/hasil-performa/:id/add',
    exact: true,
    component: EvaluasiDiri,
    access: [ROLE.admin, ROLE.karyawan, ROLE.manager]
  },
  {
    path: '/daftar-evaluasi-performa/:id',
    exact: true,
    component: EvaluasiPerforma,
    access: [ROLE.manager]
  },
  {
    path: '/daftar-evaluasi-performa',
    exact: true,
    component: DaftarEvaluasiPerforma,
    access: [ROLE.manager]
  },
  {
    path: '/gaji/',
    exact: true,
    component: KelolaGaji,
    access: [ROLE.admin, ROLE.administrasi]
  },
  {
    path: '/akun/:idUser/edit',
    exact: true,
    component: DetailEditUser,
    access: [ROLE.admin]
  },
  {
    component: NoPage
  }
]
