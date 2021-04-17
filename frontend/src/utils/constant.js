export const JENIS_PAKET = [
  {label: "Divisi", value: "divisi"},
  {label: "AntarDivisi", value: "antardivisi"}
]

export const ROLE = {
  admin: "Admin",
  manager: "Manager",
  karyawan: "Karyawan",
  guest: "Guest"
}

export const ROLES = [
  "Admin", "Manager", "Karyawan"
]

export const newPertanyaanTemplate = { 
  pertanyaan: "", 
  tipe: 0 
} 

export const newAspekTemplate = {
  nama: "", 
  list_pertanyaan: [newPertanyaanTemplate] 
}
