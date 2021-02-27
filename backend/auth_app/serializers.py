from rest_framework import serializers
from .models import AppUser

class UserSerializer(serializers.HyperlinkedModelSerializer):

  class Meta:
    model = AppUser
    fields = ('pk', 'username', 'email', 'role')