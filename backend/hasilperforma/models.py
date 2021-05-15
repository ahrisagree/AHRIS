from django.db import models
from auth_app.models import AppUser
import datetime

class HasilPerforma(models.Model):
  user = models.ForeignKey(AppUser, 
          on_delete=models.CASCADE,
          related_name='hasil_performas')
  manager_komentator = models.ForeignKey(AppUser,
          on_delete=models.SET_NULL,
          null=True)
  komentar = models.TextField(blank=True, null=True)
  periode = models.DateField()
  skor = models.IntegerField()
  deskripsi = models.TextField(blank=True, null=True)
  nama = models.CharField(max_length=255)

  def __str__(self):
    return "{} {}".format(self.user.username, self.nama)

class AspekHasilPerforma(models.Model):
  hasil_performa = models.ForeignKey(HasilPerforma,
          on_delete=models.CASCADE,
          related_name='list_aspek')
  nama = models.CharField(max_length=255)
  skor = models.IntegerField()
  deskripsi = models.TextField(blank=True, null=True)
  
class EvaluasiDiri(models.Model):
  hasil_performa = models.ForeignKey(HasilPerforma,
          on_delete=models.CASCADE,
          related_name='evaluasi_diri')
  tanggal = models.DateField(default=datetime.date.today)
  current_performance = models.TextField()
  to_do = models.TextField()
  parameter = models.TextField()
  feedback = models.TextField(blank=True, null=True)
  manager_feedbacker = models.ForeignKey(AppUser,
          on_delete=models.SET_NULL,
          null=True)

  
