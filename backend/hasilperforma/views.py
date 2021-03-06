from rest_framework import viewsets, mixins, exceptions
from rest_framework.permissions import IsAuthenticated
from auth_app.permissions import *
from .models import *
from .serializers import *
from backend.filters import HasilPerformaFilter


class HasilPerformaViewSet(viewsets.ModelViewSet):
  permission_classes = (IsAuthenticated, DefaultRolePermission, HasilPerformaPermission)
  http_methods = ('get', 'post', 'patch')
  queryset = HasilPerforma.objects.all().order_by('-id')
  serializer_class = HasilPerformaMiniSerializer
  filter_class = HasilPerformaFilter
  filterset_fields = ['periode', 'divisi', 'user']
  search_fields = ['user__username']

  def get_serializer_class(self):
    if self.request.method == "GET":
      return HasilPerformaSerializer
    return super().get_serializer_class()

  def get_queryset(self):
    if not self.request.user.has_role("Manager"):
      return HasilPerforma.objects.filter(user=self.request.user).order_by('-periode')
    return super().get_queryset()

  def update(self, request, *args, **kwargs):
    hasil_performa = self.get_object()
    if request.data['komentar']:
      request.data['manager_komentator'] = request.user.pk
    return super().update(request, *args, **kwargs)



class EvaluasiDiriViewSet(viewsets.ModelViewSet):
  permission_classes = (IsAuthenticated, DefaultRolePermission, ManagerOnlyEditPermission, EvaluasiDiriDeletePermission)
  http_methods = ('post', 'patch', 'delete')
  queryset = EvaluasiDiri.objects.all().order_by('-tanggal')
  serializer_class = EvaluasiDiriSerializer

  def get_serializer_class(self):
    if self.request.method == "PATCH":
      return EvaluasiDiriPlainSerializer
    return super().get_serializer_class()

  def update(self, request, *args, **kwargs):
    evaluasi_diri = self.get_object()
    if request.data['feedback']:
      request.data['manager_feedbacker'] = request.user.pk
    return super().update(request, *args, **kwargs)

  def destroy(self, request, *args, **kwargs):
    evaluasi_diri = self.get_object()
    print(evaluasi_diri.feedback)
    print(type(evaluasi_diri.feedback))
    if evaluasi_diri.feedback != None and evaluasi_diri.feedback != '':
      raise exceptions.ValidationError({'detail':"Evaluasi diri yang sudah difeedback tidak dapat dihapus"})
    return super().destroy(request, *args, **kwargs)