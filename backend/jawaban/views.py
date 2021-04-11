from rest_framework import viewsets, pagination
from rest_framework.permissions import IsAuthenticated
from .models import *
from .serializers import *
from auth_app.permissions import *

class PaketJawabanViewSet(viewsets.ModelViewSet):
  permission_classes = (IsAuthenticated, DefaultRolePermission)
  http_methods = ('get', 'post')
  queryset = PaketJawaban.objects.all()
  # pagination_clas = pagination.PageNumberPagination
  serializer_class = PaketJawabanSerializer
  
