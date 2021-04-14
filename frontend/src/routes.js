import BuatPaketPertanyaan from "views/BuatPaketPertanyaan";
import Home from "./views/Home";

export default [
  {
    path: '/',
    exact: true,
    component: Home,
  },
  {
    path: '/paket-pertanyaan/add',
    exact: true,
    component: BuatPaketPertanyaan,
  },
]