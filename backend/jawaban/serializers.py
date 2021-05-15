from rest_framework import serializers
from django.utils.translation import ugettext_lazy as _
from backend.utils import get_or_none
from .models import *

"""
in this file Serializer:
- Jawaban
- AspekJawaban
- PaketJawaban
- PaketJawaban Mini
"""

class JawabanSerializer(serializers.ModelSerializer):
  class Meta:
    model = Jawaban
    fields = ('jawaban', 'pertanyaan', 'tipe')

class AspekJawabanSerializer(serializers.ModelSerializer):
  list_jawaban = JawabanSerializer(many=True)

  def create(self, validated_data):
    list_jawaban_data = validated_data.pop('list_jawaban')
    new_aspek = super().create(validated_data)
    for jawaban_data in list_jawaban_data:
      jawaban = JawabanSerializer(data = jawaban_data)
      if jawaban.is_valid(raise_exception=True):
        jawaban.save(aspek=new_aspek)
    return new_aspek

  class Meta:
    model = AspekJawaban
    fields = ('nama', 'list_jawaban')

class PaketJawabanSerializer(serializers.ModelSerializer):
  list_aspek = AspekJawabanSerializer(many=True)

  def create(self, validated_data):
    list_aspek_data = validated_data.pop('list_aspek')
    new_paket = super().create(validated_data)
    for aspek_data in list_aspek_data:
      aspek = AspekJawabanSerializer(data = aspek_data)
      if aspek.is_valid(raise_exception=True):
        aspek.save(paket=new_paket)
    return new_paket
  
  class Meta:
    model = PaketJawaban
    fields = '__all__'
    extra_kwargs = {'paket_pertanyaan': {'required': True}}

class PaketJawabanMiniSerializer(serializers.ModelSerializer):
  class Meta:
    model = PaketJawaban
    fields = '__all__'