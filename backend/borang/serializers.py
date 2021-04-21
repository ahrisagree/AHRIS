from rest_framework import serializers
from django.utils.translation import ugettext_lazy as _
from backend.utils import get_or_none
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

  def update(self, instance, validated_data):
    list_pertanyaan_data = validated_data.pop('list_pertanyaan')

    new_list_pertanyaan = []
    for pertanyaan_data in list_pertanyaan_data:
      pertanyaan_obj = get_or_none(Pertanyaan, **pertanyaan_data, aspek=instance)
      if pertanyaan_obj != None:
        pertanyaan = PertanyaanSerializer(pertanyaan_obj, data=pertanyaan_data)
        if pertanyaan.is_valid(raise_exception=True):
          pertanyaan.save(aspek=instance)
      else:
        pertanyaan = PertanyaanSerializer(data=pertanyaan_data)
        if pertanyaan.is_valid(raise_exception=True):
          pertanyaan_obj = pertanyaan.save(aspek=instance)

      new_list_pertanyaan.append(pertanyaan_obj)
    instance.list_pertanyaan.set(new_list_pertanyaan)

    return super().update(instance, validated_data)

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
    new_paket.save()

    for aspek_data in list_aspek_data:
      aspek = AspekPertanyaanSerializer(data = aspek_data)
      if aspek.is_valid(raise_exception=True):
        aspek.save(paket=new_paket)
    return new_paket

  def update(self, instance, validated_data):
    kategori = validated_data.pop('kategori')
    list_aspek_data = validated_data.pop('list_aspek')
    instance.kategori=kategori

    new_aspek_list = []
    for aspek_data in list_aspek_data:
      aspek_obj = get_or_none(AspekPertanyaan, nama=aspek_data['nama'], paket=instance)
      if aspek_obj != None: 
        aspek = AspekPertanyaanSerializer(aspek_obj, data=aspek_data)
        if aspek.is_valid(raise_exception=True):
          aspek.save(paket=instance)
      else:
        aspek = AspekPertanyaanSerializer(data=aspek_data)
        if aspek.is_valid(raise_exception=True):
          aspek_obj = aspek.save(paket=instance)
      
      new_aspek_list.append(aspek_obj)
    instance.list_aspek.set(new_aspek_list)

    return super().update(instance, validated_data)

  class Meta:
    model = PaketPertanyaan
    fields = '__all__'
    depth = 1

class PaketPertanyaanMiniSerializer(serializers.ModelSerializer):
  class Meta:
    model = PaketPertanyaan
    fields = '__all__'
    depth = 1