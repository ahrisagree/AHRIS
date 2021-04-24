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
        if presensi == None and not is_lembur:
            raise serializers.ValidationError({'tanggal':['Anda tidak memiliki Presensi pada tanggal ini']})
        attrs['presensi'] = presensi
        return super().validate(attrs)

    def create(self, validated_data):
        presensi = validated_data.pop('presensi')
        log = super().create(validated_data)
        presensi.log = log
        presensi.save()
        return log

    # TODO case nya log apaaja gw lupa

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
        fields = '__all__'
