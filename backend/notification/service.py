from .models import Notification

base_link = {
  'log': '/log/{}',
  'assignment': '/penilaian',
  'change_password': '/profil',
  'isi_borang': '/mengisi-borang',
  'hasil_performa': '/hasil-performa/{}'
}

class NotifService:
  
  @staticmethod
  def newAkunCreated(akun):
    try:
      Notification.objects.create(
        user = akun,
        text = "Selamat Datang di AHRIS, Ayo ganti password anda untuk pertama kali",
        link = base_link['change_password']
      )
    except Exception as e:
      print(e)

  @staticmethod
  def logApprovedNotif(log):
    try:
      Notification.objects.create(
        user = log.user,
        text = "Log Aktivitas {} telah disetujui".format(log.tanggal),
        link = base_link['log'].format(log.id)
      )
    except Exception as e:
      print(e)

  @staticmethod
  def logRejectedNotif(log):
    try:
      Notification.objects.create(
        user = log.user,
        text = "Log Aktivitas {} telah ditolak".format(log.tanggal),
        link = base_link['log'].format(log.id)
      )
    except Exception as e:
      print(e)

  @staticmethod
  def newAssignmentNotif(user):
    try:
      Notification.objects.create(
        user = user,
        text = "Ada Borang penilaian karyawan baru untuk anda isi",
        link = base_link['isi_borang']
      )
    except Exception as e:
      print(e)

  @staticmethod
  def hasilPerformaCreated(hasilperforma):
    try:
      Notification.objects.create(
        user = hasilperforma.user,
        text = "Anda menerima Hasil Performa {} periode {}".format(hasilperforma.nama, str(hasilperforma.periode)[:7]),
        link = base_link['hasil_performa'].format(hasilperforma.id)
      )
    except Exception as e:
      print(e)

  @staticmethod
  def evaluasiDiriFeedbacked(evaluasidiri):
    try:
      Notification.objects.create(
        user = evaluasidiri.hasil_performa.user,
        text = "Manager {} Memberi anda feedback pada Hasil Performa anda".format(evaluasidiri.manager_feedbacker.username),
        link = base_link['hasil_performa'].format(evaluasidiri.hasil_performa.id)
      )
    except Exception as e:
      print(e)
    