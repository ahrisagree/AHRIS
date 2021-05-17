from rest_framework import generics, pagination, status, mixins, viewsets, views
from rest_framework.permissions import IsAuthenticated
from rest_framework.response import Response
from .models import *
from jawaban.models import PaketJawaban, AspekJawaban, Jawaban
from hasilperforma.models import HasilPerforma
from .serializers import *
from auth_app.permissions import *
from backend.filters import AssignmentFilter

class AssignmentView(viewsets.ReadOnlyModelViewSet, mixins.CreateModelMixin):
  permission_classes = (IsAuthenticated, DefaultRolePermission, AdminEditPermission)
  # TODO cek lagi permissionnya
  http_methods = ('get', 'post')
  queryset = Assignment.objects.all().order_by('-id')
  serializer_class = AssignmentSerializer
  filter_class = AssignmentFilter
  filterset_fields = ['user_dinilai', 'user_penilai', 'paket_pertanyaan', 'periode']
  search_fields = ['list_paket_pertanyaan__nama']

  def perform_create(self, serializer):
    return serializer.save()
  
  """Superadmin Post multiple Assignment"""
  def create(self, request, *args, **kwargs):
    self.serializer_class = AssignRespondenSerializer
    serializer = self.get_serializer(data=request.data)
    serializer.is_valid(raise_exception=True)
    response = self.perform_create(serializer)
    return Response(response, status=status.HTTP_201_CREATED)
  
  """Karyawan Get own Assignment, Admin get all Assignment"""
  def retrieve(self, request, *args, **kwargs):
    self.serializer_class = AssignmentDetailSerializer
    if not request.user.has_role('Admin'):
      self.queryset = Assignment.objects.filter(user_penilai=request.user).order_by('-id')
    return super().retrieve(request, *args, **kwargs)
  
  """Karyawan List own Assignment, Admin list all Assignment"""
  def list(self, request, *args, **kwargs):
    if request.query_params.get('disablepagination') != None:
      self.pagination_class = None
    if not request.user.has_role('Admin'):
      self.queryset = Assignment.objects.filter(user_penilai=request.user).order_by('-id')
    return super().list(request, *args, **kwargs)  


class ScoringView(views.APIView):
  permission_classes = (IsAuthenticated, AdminPermission)
  http_methods = ('get')

  def get(self, request, *args, **kwargs):
    # Filter Paket Jawaban based by assignment_user_dinilai, paket_pertanyaan_id, assignment_periode
    # Since assignment_periode is normalized to be always date 01, this kwargs normalized too
    kwargs['assignment__periode'] = kwargs['assignment__periode'][:8]+"01"
    list_paket_jawaban = PaketJawaban.objects.filter(**kwargs)
    list_aspek_jawaban = AspekJawaban.objects.filter(paket__in=list_paket_jawaban)
    hasil_performa_exist = HasilPerforma.objects.filter(
      paket__id = kwargs['paket_pertanyaan__id'],
      periode = kwargs['assignment__periode'],
      user = kwargs['assignment__user_dinilai__pk']
    ).exists()

    skor_map = {}
    bobot_map = {}
    list_aspek_serializer = []
    nama_paket = "None"

    for aspek in list_aspek_jawaban:
      nama_paket = aspek.paket.nama
      list_skor = skor_map.get(aspek.nama, [])
      list_skor.append(aspek.get_sum_score())
      skor_map[aspek.nama] = list_skor
      bobot_map[aspek.nama] = aspek.bobot

    for skor_aspek in skor_map.keys():
      list_skor = skor_map[skor_aspek]
      serializer = ScoringAspekSerializer(data={
        'nama': skor_aspek,
        'skor': sum(list_skor)/(len(list_skor) if len(list_skor) != 0 else 1),
        'bobot': bobot_map[skor_aspek]
        })
      if serializer.is_valid():
        list_aspek_serializer.append(serializer.data)
  
    response = ScoringSerializer(data={
      'list_aspek': list_aspek_serializer,
      'nama': nama_paket, 
      'hasil_performa_exist': hasil_performa_exist
    })
    if response.is_valid():
      return Response(response.data, status=status.HTTP_200_OK)
    return Response({'detail': 'Error'}, status=status.HTTP_501_NOT_IMPLEMENTED)
    
    
