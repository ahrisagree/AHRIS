from django.db import models
from auth_app.models import AppUser

class Notification(models.Model):
  text = models.CharField(max_length=255)
  link = models.CharField(max_length=255)
  timestamp = models.DateTimeField()
  read = models.BooleanField(default=False)
  user = models.ForeignKey(AppUser,
      on_delete=models.CASCADE,
      related_name='notifications')

