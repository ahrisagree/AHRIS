from rest_framework import serializers
from .models import *
from auth_app.serializers import UserSerializer

class GajiSerializer(serializers.ModelSerializer):
  user = UserSerializer
  class Meta: 
    model = Gaji
    fields = '__all__'
    read_only_fields = ('user', 'periode')
    
