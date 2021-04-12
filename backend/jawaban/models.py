from django.db import models
from borang.models import Pertanyaan, PaketPertanyaan
from auth_app.models import AppUser
from assign.models import Assignment

"""
in this file model:
- Assignment
- PaketJawaban
- AspekJawaban
- Jawaban 
"""

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