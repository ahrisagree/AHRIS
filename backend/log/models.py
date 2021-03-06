from django.db import models
from auth_app.models import AppUser
from rest_framework.settings import api_settings
import datetime
from django.utils.timezone import now
from .status import STATUS

class LogAktivitas(models.Model):
    STATUS_CHOICES = [
        (0, 'pending'),
        (1, 'disetujui'),
        (2, 'ditolak')
    ]
    tanggal = models.DateField(default = datetime.date.today)
    jam_masuk = models.TimeField(default = now)
    jam_keluar = models.TimeField(default = now)
    keterangan = models.CharField(max_length=50, default="", blank=True, null=True)
    aktivitas = models.CharField(max_length=250)
    link_deliverable = models.CharField(max_length=250)
    status_deliverable = models.CharField(max_length=50)
    notes = models.CharField(max_length=50, default="", blank=True, null=True)
    is_lembur = models.BooleanField(default=False)
    status_log = models.IntegerField(default=STATUS['pending'], choices=(STATUS_CHOICES))
    komentar = models.CharField(max_length=250, blank=True, null=True)
    manajer_penyetuju = models.ForeignKey(AppUser,
        on_delete=models.SET_NULL,
        null=True,
        related_name='manajer_penyetuju')
    user = models.ForeignKey(AppUser,
        on_delete=models.SET_NULL,
        null=True,
        related_name='log')
    alasan_lembur = models.CharField(max_length=250, blank=True, null=True)

    def total_jam(self):
        mulai = datetime.timedelta(
            hours=self.jam_masuk.hour,
            minutes=self.jam_masuk.minute,
            seconds=self.jam_masuk.second
        )
        selesai = datetime.timedelta(
            hours=self.jam_keluar.hour,
            minutes=self.jam_keluar.minute,
            seconds=self.jam_keluar.second
        )
        return selesai - mulai

    # status_log 
    # 0 -> Menunggu Persetujuan
    # 1 -> disetujui
    # 2 -> ditolak

    def __str__(self):
        return "{} - {} - {}".format(self.user, self.tanggal, self.is_lembur)


class Presensi(models.Model):
    tanggal = models.DateField(default = datetime.date.today)
    jam_masuk = models.TimeField(default = now)
    keterangan = models.CharField(max_length=255, blank=True, null=True)
    user = models.ForeignKey(AppUser,
        on_delete=models.SET_NULL,
        null=True,
        related_name='presensi') 
    log = models.OneToOneField(LogAktivitas,
        on_delete=models.SET_NULL,
        null=True,
        related_name='presensi')
    
    def __str__(self):
        return "{} - {}-{}".format(self.user, self.tanggal, self.jam_masuk) 

