from rest_framework import serializers
from .models import *
from auth_app.serializers import UserListSerializer

class GajiSerializer(serializers.ModelSerializer):
  user = UserListSerializer()
  class Meta: 
    model = Gaji
    fields = '__all__'
    read_only_fields = ('user', 'periode')
    
