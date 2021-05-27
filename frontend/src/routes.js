import BuatPaketPertanyaan from "views/BuatPaketPertanyaan";
import Home from "./views/Home";
import Login from "./views/Login";
import Profil from "./views/Profil";
import Coba from "./views/Coba";
import LogAktivitas from "./views/LogAktivitas/LogAktivitas";
import DaftarLogKaryawan from "./views/LogAktivitas/DaftarLogKaryawan/";
import DetailLogAktivitas from "./views/LogAktivitas/DetailLogAktivitas/";
import DaftarLog from "./views/LogAktivitas/DaftarLog/";
import MyPresensi from "./views/LogAktivitas/MyPresensi/";
import Register from "./views/Register";
import DaftarKaryawan from "views/DaftarKaryawan";
// import EvaluasiPerforma from "views/EvaluasiPerforma";
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
import EvaluasiPerforma from "views/EvaluasiPerforma";
import DaftarEvaluasiPerforma from "views/DaftarEvaluasiPerforma";

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
    path: "/akun/register",
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
    component: DaftarKaryawan
  },
  {
    path: '/mengisi-borang/:id',
    exact: true,
    component: DaftarBorang
  },
  {
    path: '/mengisi-borang',
    exact: true,
    component: DaftarKaryawanDinilai
  },
  {
    path: '/mengisi-borang/:id/:idPaket',
    exact: true,
    component: MengisiBorang
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
    path: '/daftar-log-karyawan',
    exact: true,
    component: DaftarLogKaryawan
  },
  {
    path: '/detail-log/:id',
    exact: true,
    component: DetailLogAktivitas
  },
  {
    path: '/edit-log/:id',
    exact: true,
    component: EditLogAktivitas
  },
  {
    path: '/kelola-performa',
    exact: true,
    component: DaftarKaryawanPerforma,
  },
  {
    path: '/kelola-performa/:idDinilai',
    exact: true,
    component: DaftarBorangPerforma,
  },
  {
    path: '/kelola-performa/:idDinilai/:idPaket',
    exact: true,
    component: Pembobotan
  },
  {
    path: '/akun/:idUser',
    exact: true,
    component: DetailEditUser
  },
  {
    path: '/log/presensi',
    exact: true,
    component: Home
  },
  {
    path: '/log/daftar-presensi',
    exact: true,
    component: MyPresensi
  },
  {
    path: '/assign',
    exact: true,
    component: AssignmentManager
  },
  {
    path: '/evaluasi-diri/add',
    exact: true,
    component: EvaluasiDiri
  },
  {
    path: '/evaluasi-performa/:id',
    exact: true,
    component: EvaluasiPerforma
  },
  {
    path: '/daftar-evaluasi-performa',
    exact: true,
    component: DaftarEvaluasiPerforma
  },
]