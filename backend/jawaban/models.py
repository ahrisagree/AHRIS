from django.db import models
from borang.models import Pertanyaan, PaketPertanyaan
from auth_app.models import AppUser

"""
in this file model:
- Assignment
- PaketJawaban
- AspekJawaban
- Jawaban 
"""
class Assignment(models.Model):
  user_dinilai = models.ForeignKey(AppUser, on_delete=models.CASCADE)
  user_penilai = models.ForeignKey(AppUser, on_delete=models.CASCADE)
  list_paket_pertanyaan = models.ManyToManyField(PaketPertanyaan,
          related_name='list_assignment')
  periode = models.DateField()

class PaketJawaban(models.Model):
  nama = models.CharField(max_length=100)
  jenis = models.CharField(max_length=50)
  kategori = models.CharField(max_length=100)
  assignment = models.ForeignKey(Assignment,
          on_delete=models.CASCADE,
          related_name='list_paket_jawaban')

  def __str__(self):
    return self.nama

class AspekJawaban(models.Model):
  nama = models.CharField(max_length=100)
  paket = models.ForeignKey(PaketJawaban,
          on_delete=models.SET_NULL,
          null=True,
          related_name='list_aspek')

  def __str__(self):
    return self.nama

class Jawaban(models.Model):
  jawaban = models.CharField(max_length=255)
  tipe = models.IntegerField()
  aspek = models.ForeignKey(AspekJawaban,
            on_delete=models.SET_NULL,
            null=True,
            related_name='list_jawaban')
  pertanyaan = models.ForeignKey(Pertanyaan,
            on_delete=models.CASCADE)
  
  def __str__(self):
    return "{} - {}".format(self.pertanyaan, self.jawaban)