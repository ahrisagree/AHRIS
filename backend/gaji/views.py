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

  def list(self, request, *args, **kwargs):
    today_period = datetime.date.today()
    today_period.replace(day=1)
    if (not Gaji.objects.filter(periode=today_period).exists()): 
      perform_generate_gaji(today_period)
    return super().list(request, *args, **kwargs)

  def perform_generate_gaji(self, period):
    for user in AppUser.objects.all():
      Gaji.object.create(
        periode=period,
        user=user,
        amount=user.gaji
      )

  
