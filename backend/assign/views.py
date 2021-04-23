from rest_framework import generics, pagination, status, mixins, viewsets
from rest_framework.permissions import IsAuthenticated
from rest_framework.response import Response
from .models import *
from .serializers import *
from auth_app.permissions import *
from backend.filters import AssignmentFilter

class AssignmentView(viewsets.ReadOnlyModelViewSet, mixins.CreateModelMixin):
  permission_classes = (IsAuthenticated, DefaultRolePermission, AdminEditPermission)
  # TODO cek lagi permissionnya
  http_methods = ('get', 'post')
  queryset = Assignment.objects.all()
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
      self.queryset = Assignment.objects.filter(user_penilai=request.user)
    return super().retrieve(request, *args, **kwargs)
  
  """Karyawan List own Assignment, Admin list all Assignment"""
  def list(self, request, *args, **kwargs):
    if not request.user.has_role('Admin'):
      self.queryset = Assignment.objects.filter(user_penilai=request.user)
    return super().list(request, *args, **kwargs)
