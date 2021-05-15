from rest_framework import serializers
from .models import Assignment
from auth_app.models import AppUser
from borang.models import PaketPertanyaan
from borang.serializers import PaketPertanyaanSerializer, PaketPertanyaanMiniSerializer
from jawaban.serializers import PaketJawabanSerializer, PaketJawabanMiniSerializer
from auth_app.serializers import UserListSerializer
from datetime import date

class AssignmentSerializer(serializers.ModelSerializer):
  user_penilai = UserListSerializer()
  user_dinilai = UserListSerializer()
  class Meta:
    model = Assignment
    fields = (
      'id',
      'user_dinilai',
      'user_penilai',
      'list_paket_pertanyaan',
      'list_paket_jawaban',
      'periode'
    )

class AssignmentDetailSerializer(serializers.ModelSerializer):
  user_penilai = UserListSerializer()
  user_dinilai = UserListSerializer()
  # list_paket_pertanyaan = PaketPertanyaanMiniSerializer(many=True)
  # list_paket_jawaban = PaketJawabanMiniSerializer(many=True)
  list_paket_pertanyaan = PaketPertanyaanSerializer(many=True)
  list_paket_jawaban = PaketJawabanSerializer(many=True)
  class Meta:
    model = Assignment
    fields = (
      'id',
      'user_dinilai',
      'user_penilai',
      'list_paket_pertanyaan',
      'list_paket_jawaban',
      'periode'
    )

class AssignRespondenSerializer(serializers.Serializer):
  """All List Of ID"""
  list_penilai = serializers.ListField(
    child=serializers.IntegerField()
  )
  list_dinilai = serializers.ListField(
    child=serializers.IntegerField()
  )
  list_borang = serializers.ListField(
    child=serializers.IntegerField()
  )
  periode = serializers.DateField()

  def validate_periode(self, periode):
    # standarized period from normal date, auto day = 1
    standarized_period = periode.replace(day=1)
    return standarized_period

  def validate_list_penilai(self, list_penilai):
    list_penilai_obj = []
    for penilai_id in list_penilai:
      try:
        list_penilai_obj.append(AppUser.objects.get(id=penilai_id))
      except:
        pass
    return list_penilai_obj
  
  def validate_list_dinilai(self, list_dinilai):
    list_dinilai_obj = []
    for dinilai_id in list_dinilai:
      try:
        list_dinilai_obj.append(AppUser.objects.get(id=dinilai_id))
      except:
        pass
    return list_dinilai_obj
  
  def validate_list_borang(self, list_borang):
    list_borang_obj = []
    for borang_id in list_borang:
      try:
        list_borang_obj.append(PaketPertanyaan.objects.get(id=borang_id))
      except:
        pass
    return list_borang_obj
  
  def create(self, validated_data):
    list_borang_data = validated_data.pop('list_borang')
    list_penilai_data = validated_data.pop('list_penilai')
    list_dinilai_data = validated_data.pop('list_dinilai')
    periode_data = validated_data.pop('periode')
    list_assignment = []
    """This going to take a while"""
    for penilai in list_penilai_data:
      for dinilai in list_dinilai_data:
        if penilai == dinilai:
          continue
        assignment = Assignment.objects.get_or_create(
          user_penilai=penilai,
          user_dinilai=dinilai,
          periode=periode_data,
        )[0]
        assignment.list_paket_pertanyaan.add(*list_borang_data)
        list_assignment.append(AssignmentSerializer(assignment).data)
    return list_assignment


class ScoringAspekSerializer(serializers.Serializer):
  nama = serializers.CharField(max_length=255)
  skor = serializers.IntegerField()

class ScoringSerializer(serializers.Serializer):
  list_aspek = ScoringAspekSerializer(many=True)