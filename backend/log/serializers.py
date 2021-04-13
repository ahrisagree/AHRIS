from rest_framework import serializers
from django.utils.translation import ugettext_lazy as _
from backend.utils import get_or_none
from .models import *

"""
in this file Serializer:
- Presensi
- LogAktivitas
"""

class PresensiSerializer(serializers.ModelSerializer):
    id = serializers.IntegerField(required=False)
    tanggal = serializers.DateField(format="%d-%m-%Y", input_formats=['%d-%m-%Y', 'iso-8601'])
    jam_masuk = serializers.TimeField(format='%I:%M %p', input_formats='%I:%M %p')
    keterangan = serializers.CharField(max_length=100)
    # id_user 

    def create(self, validated_data):
        return Presensi.objects.create(**validated_data)
    
    class Meta:
        model = Presensi
        fields = '__all__'

class LogAktivitasSerializer(serializers.ModelSerializer):
    id = serializers.IntegerField(required=False)
    tanggal = models.DateField(format="%d-%m-%Y", input_formats=['%d-%m-%Y', 'iso-8601'])
    jam_masuk = models.TimeField(format='%I:%M %p', input_formats='%I:%M %p')
    jam_keluar = models.TimeField(format='%I:%M %p', input_formats='%I:%M %p')
    keterangan = models.CharField(max_length=50)
    aktivitas = models.CharField(max_length=250)
    link_deliverable = models.CharField(max_length=250)
    status_deliverable = models.CharField(max_length=50)
    tipe_log = models.CharField(max_length=35)
    status_log = models.CharField(max_length=35)
    komentar = models.CharField(max_length=250)
    # manajer penyetuju harus ada class User-nya dulu
    alasan_lembur = models.CharField(max_length=250)

    def create(self, validated_data): # validated_data: LogAktivitas, ketika di-pop menghasilkan Presensi
        new_log = super().create(validated_data) 
        presensi_data = validated_data.pop('log')
        presensi = PresensiSerializer(data = presensi_data)
        if presensi.is_valid(raise_exception=True):
            presensi.save(log=new_log)
        return new_log
    
    def update(self, instance, validated_data): # instance = LogAktivitas
        presensi_data = validated_data.pop('log')
        presensi_obj = get_or_none(Presensi, **log_data, log=instance)
        if presensi_obj != None:
            presensi = PresensiSerializer(presensi_obj, data=presensi_data)
            if presensi.is_valid(raise_exception=True):
                presensi.save(log=instance)
        else:
            presensi = PresensiSerializer(data=presensi_data)
            if presensi.is_valid(raise_exception=True):
                presensi_obj = presensi.save(log=instance)

        instance.log.set(presensi_obj)

        return super().update(instance, validated_data)

    class Meta:
        model = LogAktivitas
        fields = '__all__'
