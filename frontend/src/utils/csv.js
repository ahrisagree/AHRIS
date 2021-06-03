import { STATUS_LOG } from "./constant";

function convertToCSV(objArray) {
  var array = typeof objArray != 'object' ? JSON.parse(objArray) : objArray;
  var str = '';

  for (var i = 0; i < array.length; i++) {
      var line = '';
      for (var index in array[i]) {
          if (line !== '') line += ','

        line += String(array[i][index]).split(',').join(" ");
      }

      str += line + '\r\n';
  }

  return str;
}


function exportCSVFile(header ,listData, fileTitle) {

  listData.unshift(header);

  // Convert Object to JSON
  var jsonObject = JSON.stringify(listData);

  var csv = convertToCSV(jsonObject);

  var exportedFilenmae = fileTitle + '.csv' || 'export.csv';

  var blob = new Blob([csv], { type: 'text/csv;charset=utf-8;' });
  if (navigator.msSaveBlob) { // IE 10+
      navigator.msSaveBlob(blob, exportedFilenmae);
  } else {
      var link = document.createElement("a");
      if (link.download !== undefined) { // feature detection
          // Browsers that support HTML5 download attribute
          var url = URL.createObjectURL(blob);
          link.setAttribute("href", url);
          link.setAttribute("download", exportedFilenmae);
          link.style.visibility = 'hidden';
          document.body.appendChild(link);
          link.click();
          document.body.removeChild(link);
      }
  }
}

export function exportGaji(data, fileName) {
  const header = {
    nama: "Nama",
    gaji: "Gaji",
    periode: "Periode",
    divisi: "Divisi"
  }
  const listData = data.map(row => ({
    nama: row.user.username,
    gaji: row.nominal,
    periode: row.periode,
    divisi: row.user.divisi.map((x)=> x.nama_divisi).join("; ")
  }));
  exportCSVFile(header, listData, fileName)
}

export function exportLog(data, fileName) {
  const header = {
    nama: "Nama", 
    tanggal: "Tanggal",
    jam_masuk: "Masuk",
    jam_keluar: "Keluar",
    tipe: "Tipe Log",
    status_log: "Status",
    status_deliverable: "Status Deliverable",
    link_deliverable: "Link Deliverable",
    aktivitas: "Aktivitas",
    keterangan: "Keterangan",
    notes: "Notes"
  }
  const listData = data.map(row=> ({
    nama: row.user.username,
    tanggal: row.tanggal,
    jam_masuk: row.jam_masuk,
    jam_keluar: row.jam_keluar,
    tipe: row.is_lembur ? "Lembur" : "Reguler",
    status_log: STATUS_LOG[row.status_log],
    status_deliverable: row.status_deliverable,
    link_deliverable: row.link_deliverable,
    aktivitas: row.aktivitas,
    keterangan: row.keterangan,
    notes: row.notes
  }))
  exportCSVFile(header, listData, fileName);
}

export function exportPresensi(data, fileName) {
  const header = {
    nama: "Nama", 
    role: "Role",
    tanggal: "Tanggal",
    jam_masuk: "Masuk",
    keterangan: "Keterangan",
  }
  const listData = data.map(row=> ({
    nama: row.user.username,
    role: row.user.role,
    tanggal: row.tanggal,
    jam_masuk: row.jam_masuk.split(".")[0],
    keterangan: row.keterangan,
  }))
  exportCSVFile(header, listData, fileName);
}