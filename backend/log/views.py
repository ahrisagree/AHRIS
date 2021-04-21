# from rest_framework import viewsets
# from rest_framework.permissions import IsAuthenticated
# from .models import *
# from .serializers import *
# from auth_app.permissions import *

# class PresensiViewSet(viewsets.ReadOnlyModelViewSet):
#     queryset = Presensi.objects.all()
#     serializer_class = PresensiSerializer

#     def list(self, request):
#         queryset = Presensi.objects.all()
#         serializer_class = PresensiSerializer(queryset, many=True)
#         return Response(serializer_class.data)

# class LogAktivitasViewSet(viewsets.ModelViewSet):
#     permission_classes = (IsAuthenticated, DefaultRolePermission, AdminEditPermission)

#     def list(self, request):
#         queryset = LogAktivitas.objects.all()
#         serializer_class = LogAktivitasSerializer(queryset, many=True)
#         return Response(serializer_class.data)

#     def retrieve(self, request):
#         queryset = LogAktivitas.objects.all()
#         log = get_object_or_404(queryset, pk=pk)
#         serializer_class = LogAktivitasSerializer(log)
#         return Response(serializer_class.data)


from django.shortcuts import render
from django.http import JsonResponse

from rest_framework.decorators import api_view
from rest_framework.response import Response

from .serializers import *
from .models import *


@api_view(['GET'])
def apiOverview(request):
    api_urls = {
        'List' : '/list-presensi/',
        'Detail Presensi' : '/presensi-detail/<str:pk>/',
        'Create' : '/presensi-create/',
    }
    return Response(api_urls)
    
@api_view(['GET'])
def listPresensi(request):
    presensi = Presensi.objects.all()
    serializer = PresensiSerializer(presensi, many=True)
    return Response(serializer.data)

@api_view(['GET'])
def listLog(request):
    log = LogAktivitas.objects.all()
    serializer = LogAktivitasSerializer(log, many=True)
    return Response(serializer.data)

@api_view(['GET'])
def presensiDetail(request, pk):
    presensi = Presensi.objects.get(id=pk)
    serializer = PresensiSerializer(presensi, many=False)
    return Response(serializer.data)

@api_view(['GET'])
def logDetail(request, pk):
    log = LogAktivitas.objects.get(id=pk)
    serializer = LogAktivitasSerializer(log, many=False)
    return Response(serializer.data)

@api_view(['POST'])
def presensiCreate(request):
    serializer = PresensiSerializer(data=request.data)

    if serializer.is_valid():
        serializer.save()
    
    return Response(serializer.data)

@api_view(['POST'])
def logCreate(request):
    serializer = LogAktivitasSerializer(data=request.data)

    if serializer.is_valid():
        serializer.save()

    return Response(serializer.data)

@api_view(['POST'])
def logUpdate(request, pk):
    log = LogAktivitas.objects.get(id=pk)
    serializer = LogAktivitasSerializer(instance=log, data=request.data)
    
    if serializer.is_valid():
        serializer.save()
    
    return Response(serializer.data)