from rest_framework import serializers
from .models import *
from auth_app.models import AppUser
from auth_app.serializers import UserListSerializer
from backend.utils import get_or_none

class EvaluasiDiriSerializer(serializers.ModelSerializer):
  manager_feedbacker = UserListSerializer(required=False)

  class Meta: 
    model = EvaluasiDiri
    fields = '__all__'


# Used for updating
class EvaluasiDiriPlainSerializer(serializers.ModelSerializer):
  class Meta: 
    model = EvaluasiDiri
    fields = '__all__'

class AspekHasilPerformaSerializer(serializers.ModelSerializer):
  class Meta:
    model = AspekHasilPerforma
    fields = ('nama', 'skor', 'deskripsi')

class HasilPerformaSerializer(serializers.ModelSerializer):
  list_aspek = AspekHasilPerformaSerializer(many=True)
  user = UserListSerializer()
  manager_komentator = UserListSerializer()
  evaluasi_diri = EvaluasiDiriSerializer(many=True)

  class Meta:
    model = HasilPerforma
    fields = (
      'nama',
      'skor',
      'deskripsi',
      'user',
      'list_aspek',
      'manager_komentator',
      'evaluasi_diri'
    )

# Use This serializer on creation & update
class HasilPerformaMiniSerializer(serializers.ModelSerializer):
  list_aspek = AspekHasilPerformaSerializer(many=True)

  def validate_periode(self, periode):
    # standarized period from normal date, auto day = 1
    standarized_period = periode.replace(day=1)
    return standarized_period

  def create(self, validated_data):
    list_aspek_data = validated_data.pop('list_aspek')
    new_hasil_performa = super().create(validated_data)
    for aspek_data in list_aspek_data:
      aspek = AspekHasilPerformaSerializer(data = aspek_data)
      if aspek.is_valid(raise_exception=True):
        aspek.save(hasil_performa=new_hasil_performa)
    return new_hasil_performa

  class Meta:
    model = HasilPerforma
    fields = '__all__'

