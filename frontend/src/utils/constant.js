export const JENIS_PAKET = [
  {label: "Divisi", value: "divisi"},
  {label: "AntarDivisi", value: "antardivisi"}
]

export const ROLE = {
  admin: "Admin",
  manager: "Manager",
  karyawan: "Karyawan",
  administrasi: "Administrasi",
  guest: "Guest"
}

export const ROLES = [
  "Admin", "Manager", "Karyawan", "Administrasi"
]

export const STATUS_LOG = [
"Menunggu Persetujuan", "Disetujui", "Ditolak"
]

export const PAGE_SIZE = 25;

export const newPertanyaanTemplate = { 
  pertanyaan: "", 
  tipe: 0 
} 

export const newAspekTemplate = {
  nama: "", 
  bobot: 0,
  list_pertanyaan: [newPertanyaanTemplate] 
}
