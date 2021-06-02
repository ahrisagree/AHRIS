from rest_framework import serializers
from django.utils.translation import ugettext_lazy as _
from .models import *
from auth_app.serializers import UserListSerializer
import datetime
from django.utils.timezone import now
from backend.utils import get_or_none

"""
in this file Serializer:
- Presensi
- LogAktivitas
- PresensiDetail
- LogAktivitasDetail
"""

class PresensiSerializer(serializers.ModelSerializer):
    class Meta:
        model = Presensi
        fields = '__all__'

class LogAktivitasSerializer(serializers.ModelSerializer):

    def validate(self, attrs):
        user = attrs.get('user')
        tanggal = attrs.get('tanggal')
        is_lembur = attrs.get('is_lembur')
        presensi = get_or_none(Presensi, user=user, tanggal=tanggal)
        # checking presensi in tanggal is exist
        if presensi == None and not is_lembur:
            raise serializers.ValidationError({'tanggal':['Anda tidak memiliki Presensi pada tanggal ini']})

        # checking time validity
        jam_masuk = attrs.get('jam_masuk')
        jam_keluar = attrs.get('jam_keluar')
        if jam_keluar < jam_masuk:
            raise serializers.ValidationError({
                    'jam_keluar':  ['Jam Masuk dan Jam Keluar tidak valid'],
                    'jam_masuk': ['Jam Masuk dan Jam Keluar tidak valid']
                })

        attrs['presensi'] = presensi
        return super().validate(attrs)

    def create(self, validated_data):
        presensi = validated_data.pop('presensi')
        if presensi.log != None:
            raise serializers.ValidationError({'detail': 'Sudah ada Log di Presensi tanggal yang sama'})
        log = super().create(validated_data)
        presensi.log = log
        presensi.save()
        return log

    class Meta:
        model = LogAktivitas
        fields = '__all__'

class PresensiDetailSerializer(serializers.ModelSerializer):
    user = UserListSerializer()
    class Meta:
        model = Presensi
        fields = '__all__'

class LogAktivitasDetailSerializer(serializers.ModelSerializer):
    manajer_penyetuju = UserListSerializer()
    user = UserListSerializer()
    class Meta:
        model = LogAktivitas
        fields = (
            "id",
            "manajer_penyetuju",
            "user",
            "tanggal",
            "jam_masuk",
            "jam_keluar",
            "keterangan",
            "aktivitas",
            "link_deliverable",
            "status_deliverable",
            "notes",
            "is_lembur",
            "status_log",
            "komentar",
            "alasan_lembur",
            "total_jam"
        )
