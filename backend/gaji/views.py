from rest_framework import viewsets, mixins
from rest_framework.permissions import IsAuthenticated
from auth_app.permissions import *
from .models import Gaji
from .serializers import *
from backend.filters import GajiFilter
from auth_app.models import AppUser
import datetime

class GajiViewSet(viewsets.ReadOnlyModelViewSet, mixins.UpdateModelMixin):
  permission_classes = (IsAuthenticated, AdministrasiOnlyPermission)
  http_methods = ('get', 'patch')
  serializer_class = GajiSerializer
  queryset = Gaji.objects.all().order_by('-id')
  filter_class = GajiFilter
  filterset_fields = ['role', 'divisi', 'periode']
  search_fields = ['user__username']

  def perform_generate_gaji(self, period):
    for user in AppUser.objects.all():
      Gaji.objects.create(
        periode=period,
        user=user,
        nominal=user.gaji
      )

  def list(self, request, *args, **kwargs):
    today = datetime.date.today()
    # Always Normalize period into 1
    period = today.replace(day=1)
    if (not Gaji.objects.filter(periode=period).exists()): 
      self.perform_generate_gaji(period)
    if request.query_params.get('disablepagination') != None:
            self.pagination_class = None
    return super().list(request, *args, **kwargs)


  
