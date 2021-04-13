from rest_framework import viewsets
from rest_framework.permissions import IsAuthenticated
from .models import *
from .serializers import *
from auth_app.permissions import *

class PresensiViewSet(viewsets.ReadOnlyModelViewSet):
    queryset = Presensi.objects.all()
    serializer_class = PresensiSerializer

    def list(self, request):
        queryset = Presensi.objects.all()
        serializer_class = PresensiSerializer(queryset, many=True)
        return Response(serializer_class.data)

class LogAktivitasViewSet(viewsets.ModelViewSet):
    permission_classes = (IsAuthenticated, DefaultRolePermission, AdminEditPermission)

    def list(self, request):
        queryset = LogAktivitas.objects.all()
        serializer_class = LogAktivitasSerializer(queryset, many=True)
        return Response(serializer_class.data)

    def retrieve(self, request):
        queryset = LogAktivitas.objects.all()
        log = get_object_or_404(queryset, pk=pk)
        serializer_class = LogAktivitasSerializer(log)
        return Response(serializer_class.data)
