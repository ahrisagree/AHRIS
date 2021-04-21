from django.db import models
from auth_app.models import AppUser
from jawaban.models import *

class Assignment(models.Model):
  user_dinilai = models.ForeignKey(AppUser,
          on_delete=models.CASCADE,
          related_name='user_dinilai')
  user_penilai = models.ForeignKey(AppUser, 
          on_delete=models.CASCADE,
          related_name='user_penilai')
  list_paket_pertanyaan = models.ManyToManyField(PaketPertanyaan,
          related_name='list_assignment')
  periode = models.DateField()

  def __str__(self):
    return "{}: {} -> {}".format(
      self.periode,
      self.user_penilai.username,
      self.user_dinilai.username
    )

  class Meta:
    unique_together = [('user_penilai', 'user_dinilai', 'periode')]
