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


export const ROLES_LABEL = [
  {label: "Admin", value: "Admin"},
  {label: "Manager", value: "Manager"},
  {label: "Karyawan", value: "Karyawan"}
]

export const STATUS_LOG = [
"Menunggu Persetujuan", "Disetujui", "Ditolak"
]

export const STATUS_LOG_LABEL = [
  {label: "Menunggu Persetujuan", value: 0},
  {label: "Disetujui", value: 1},
  {label: "Ditolak", value: 2}
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
