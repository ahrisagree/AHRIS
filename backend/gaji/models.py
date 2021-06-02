from django.db import models
from auth_app.models import AppUser

class Gaji(models.Model):
  periode = models.DateField()
  user = models.ForeignKey(AppUser,
      on_delete=models.CASCADE,
      related_name='gaji_bulanan')
  nominal = models.IntegerField()

  

