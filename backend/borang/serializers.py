from rest_framework import serializers
from django.utils.translation import ugettext_lazy as _
from .models import *

"""
in this file Serializer:
- KategoriPertanyaan
- Pertanyaan
- AspekPertanyaan
- PaketPertanyaan
- PaketPertanyaan Mini
"""

class KategoriPertanyaanSerializer(serializers.ModelSerializer):
  id = serializers.IntegerField(required=False)
  nama = serializers.CharField(max_length=100, required=False)
  class Meta:
    model = KategoriPertanyaan
    fields = '__all__'

class PertanyaanSerializer(serializers.ModelSerializer):
  class Meta:
    model = Pertanyaan
    fields = ('tipe', 'pertanyaan')

class AspekPertanyaanSerializer(serializers.ModelSerializer):
  list_pertanyaan = PertanyaanSerializer(many=True)

  def create(self, validated_data):
    list_pertanyaan_data = validated_data.pop('list_pertanyaan')
    new_aspek = super().create(validated_data)
    for pertanyaan_data in list_pertanyaan_data:
      pertanyaan = PertanyaanSerializer(data = pertanyaan_data)
      if pertanyaan.is_valid(raise_exception=True):
        pertanyaan.save(aspek=new_aspek)
    return new_aspek

  class Meta:
    model = AspekPertanyaan
    fields = ('nama', 'list_pertanyaan')

class PaketPertanyaanSerializer(serializers.ModelSerializer):
  list_aspek = AspekPertanyaanSerializer(many=True)
  kategori = KategoriPertanyaanSerializer()

  def validate_kategori(self, kategori):
    try: 
      kategori_obj = KategoriPertanyaan.objects.get_or_create(**kategori)[0]
    except:
      raise serializers.ValidationError(_("Fail get Kategori"))
    return kategori_obj

  def create(self, validated_data):
    kategori = validated_data.pop('kategori')
    list_aspek_data = validated_data.pop('list_aspek')
    new_paket = super().create(validated_data)
    new_paket.kategori=kategori

    for aspek_data in list_aspek_data:
      aspek = AspekPertanyaanSerializer(data = aspek_data)
      if aspek.is_valid(raise_exception=True):
        aspek.save(paket=new_paket)
    return new_paket

  class Meta:
    model = PaketPertanyaan
    fields = '__all__'
    depth = 1

class PaketPertanyaanMiniSerializer(serializers.ModelSerializer):
  class Meta:
    model = PaketPertanyaan
    fields = '__all__'
    depth = 1