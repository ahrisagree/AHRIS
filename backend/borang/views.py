from rest_framework import viewsets, pagination
from rest_framework.permissions import IsAuthenticated
from .models import *
from .serializers import *
from auth_app.permissions import *

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
  pagination_class = pagination.PageNumberPagination
  serializer_class = PaketPertanyaanSerializer

  def list(self, request, *args, **kwargs):
    self.serializer_class = PaketPertanyaanMiniSerializer
    return super().list(request, *args, **kwargs)