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
  paket_pertanyaan = models.ForeignKey(PaketPertanyaan,
          on_delete=models.SET_NULL,
          null=True)

  def get_sum_score(self):
    count = 0
    total = 0
    for aspek in self.list_aspek.all():
      total += int(aspek.get_sum_score())
      count += 1
    if count == 0:
      return 0
    return total/count

  def __str__(self):
    return self.nama

class AspekJawaban(models.Model):
  nama = models.CharField(max_length=100)
  paket = models.ForeignKey(PaketJawaban,
          on_delete=models.CASCADE,
          related_name='list_aspek')

  def get_sum_score(self):
    count = 0
    total = 0
    for jawaban in self.list_jawaban.all():
      if jawaban.tipe == 0:
        total += int(jawaban.jawaban)
        count += 1
    if count == 0:
      return 0
    return total/count


  def __str__(self):
    return self.nama

class Jawaban(models.Model):
  jawaban = models.CharField(max_length=255)
  tipe = models.IntegerField()
  aspek = models.ForeignKey(AspekJawaban,
            on_delete=models.CASCADE,
            related_name='list_jawaban')
  pertanyaan = models.CharField(max_length=255)
  
  def __str__(self):
    return "{} - {}".format(self.pertanyaan, self.jawaban)