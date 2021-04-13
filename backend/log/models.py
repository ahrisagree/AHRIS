from django.db import models

class Presensi(models.Model):
    tanggal = models.DateField(format="%d-%m-%Y", input_formats=['%d-%m-%Y', 'iso-8601'])
    jam_masuk = models.TimeField(format='%I:%M %p', input_formats='%I:%M %p')
    keterangan = models.CharField(max_length=100)
    # id_user 
    log = models.ForeignKey(LogAktivitas,
        on_delete=models.SET_NULL,
        null=True,
        related_name='log')
    
    def __str__(self):
        return self.keterangan 

class LogAktivitas(models.Model):
    tanggal = models.DateField(format="%d-%m-%Y", input_formats=['%d-%m-%Y', 'iso-8601'])
    jam_masuk = models.TimeField(format='%I:%M %p', input_formats='%I:%M %p')
    jam_keluar = models.TimeField(format='%I:%M %p', input_formats='%I:%M %p')
    keterangan = models.CharField(max_length=50)
    aktivitas = models.CharField(max_length=250)
    link_deliverable = models.CharField(max_length=250)
    status_deliverable = models.CharField(max_length=50)
    tipe_log = models.CharField(max_length=35)
    status_log = models.CharField(max_length=35)
    komentar = models.CharField(max_length=250)
    # manajer penyetuju
    alasan_lembur = models.CharField(max_length=250)

    def __str__(self):
        return self.aktivitas
