from rest_framework import viewsets, mixins
from rest_framework.permissions import IsAuthenticated
from rest_framework.exceptions import ValidationError, NotFound
from django.utils.translation import ugettext_lazy as _
from backend.utils import get_or_none
from .models import *
from .serializers import *
from auth_app.permissions import *

class PaketJawabanViewSet(viewsets.GenericViewSet, mixins.CreateModelMixin):
  permission_classes = (IsAuthenticated, DefaultRolePermission)
  http_methods = ('post')
  queryset = PaketJawaban.objects.all()
  serializer_class = PaketJawabanSerializer

  def create(self, request, *args, **kwargs):
    """
    Cek user yang menilai adalah Penilai dari assignmentnya
    dan paket pertanyaannya belum dijawab
    dan paket pertanyaannya ada di assignmentnya
    TODO Please Test
    """
    assignment = get_or_none(Assignment, id=request.data['assignment'])
    paket_pertanyaan = get_or_none(PaketPertanyaan, id=request.data['paket_pertanyaan'])
    if assignment != None:
      if assignment.user_penilai == request.user and paket_pertanyaan in assignment.list_paket_pertanyaan.all():
        for paket_jawaban in assignment.list_paket_jawaban.all():
          if (paket_jawaban.paket_pertanyaan == paket_pertanyaan):
            raise ValidationError({'detail': "You have answered this one"})
        return super().create(request, *args, **kwargs)
      raise ValidationError({'detail': "You don't have permission to answer this borang"})
    raise NotFound({'detail': 'Assignment Not Found'})
