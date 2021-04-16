from rest_framework import viewsets
from rest_framework.permissions import IsAuthenticated
from .models import *
from .serializers import *
from auth_app.permissions import *
from backend.filters import BorangFilter

"""
in this file:
- KategoriViewSet
- PaketPertanyaanViewSet
"""
class KategoriViewSet(viewsets.ReadOnlyModelViewSet):
  queryset = KategoriPertanyaan.objects.all()
  pagination_class = None
  serializer_class = KategoriPertanyaanSerializer

class PaketPertanyaanViewSet(viewsets.ModelViewSet):
  permission_classes = (IsAuthenticated, DefaultRolePermission, AdminEditPermission)
  queryset = PaketPertanyaan.objects.all()
  serializer_class = PaketPertanyaanSerializer
  filter_class = BorangFilter
  filterset_fields = ['kategori', 'jenis']
  search_fields = ['nama']

  def list(self, request, *args, **kwargs):
    self.serializer_class = PaketPertanyaanMiniSerializer
    if request.query_params.get('disablepagination') != None:
      self.pagination_class = None
    return super().list(request, *args, **kwargs)