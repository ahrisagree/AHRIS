from django.db import models

class KategoriPertanyaan(models.Model):
  nama = models.CharField(max_length=100)

  def __str__(self):
    return self.nama

class PaketPertanyaan(models.Model):
  nama = models.CharField(max_length=100)
  jenis = models.CharField(max_length=50)
  kategori = models.ForeignKey(KategoriPertanyaan,
            on_delete=models.SET_NULL,
            null=True)

  def __str__(self):
    return self.nama

class AspekPertanyaan(models.Model):
  nama = models.CharField(max_length=100)
  paket = models.ForeignKey(PaketPertanyaan,
          on_delete=models.SET_NULL,
          null=True,
          related_name='list_aspek')
  bobot = models.FloatField()

  def __str__(self):
    return self.nama

class Pertanyaan(models.Model):
  pertanyaan = models.CharField(max_length=255)
  tipe = models.IntegerField()
  aspek = models.ForeignKey(AspekPertanyaan,
            on_delete=models.SET_NULL,
            null=True,
            related_name='list_pertanyaan')
  
  def __str__(self):
    return self.pertanyaan