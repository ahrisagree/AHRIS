from django.db import models
from auth_app.models import AppUser
from rest_framework.settings import api_settings
import datetime
from django.utils.timezone import now

class LogAktivitas(models.Model):
    tanggal = models.DateField(default = datetime.date.today)
    jam_masuk = models.TimeField(default = now)
    jam_keluar = models.TimeField(default = now)
    keterangan = models.CharField(max_length=50)
    aktivitas = models.CharField(max_length=250)
    link_deliverable = models.CharField(max_length=250)
    status_deliverable = models.CharField(max_length=50)
    tipe_log = models.CharField(max_length=35)
    status_log = models.CharField(max_length=35)
    komentar = models.CharField(max_length=250)
    # manajer_penyetuju = models.ForeignKey(AppUser,
    #     on_delete=models.SET_NULL,
    #     null=True,
    #     related_name='manajer_penyetuju')
    alasan_lembur = models.CharField(max_length=250)

    def __str__(self):
        return self.aktivitas


class Presensi(models.Model):
    tanggal = models.DateField(default = datetime.date.today)
    jam_masuk = models.TimeField(default = now)
    keterangan = models.CharField(max_length=100)
    # id_user = models.ForeignKey(AppUser,
    #     on_delete=models.SET_NULL,
    #     null=True,
    #     related_name='id_user') 
    # log = models.ForeignKey(LogAktivitas,
    #     on_delete=models.SET_NULL,
    #     null=True,
    #     related_name='log')
    
    def __str__(self):
        return self.keterangan 

