from rest_framework import viewsets, exceptions
from rest_framework.permissions import IsAuthenticated
from .models import *
from .serializers import *
from backend.utils import get_or_none
from auth_app.permissions import *
from django.utils.timezone import now
from backend.filters import PresensiFilter, LogAktivitasFilter

class PresensiViewSet(viewsets.ModelViewSet):
    permission_classes = (IsAuthenticated, DefaultRolePermission)
    http_methods = ('get', 'post')
    queryset = Presensi.objects.all()
    serializer_class = PresensiSerializer
    filter_class = PresensiFilter
    filterset_fields = ['tanggal', 'user']
    search_fields = ['id_user__username']

    def get_serializer_class(self):
        if self.request.method == 'GET':
            return PresensiDetailSerializer
        return super().get_serializer_class()

    def create(self, request, *args, **kwargs):
        time_now = datetime.datetime.now()
        try: 
            presensi = get_or_none(Presensi, id_user=request.user.id, tanggal=time_now.date())
            if presensi != None:
                raise Exception
        except:
            raise exceptions.ValidationError({'detail':"Anda Sudah Mengisi Presensi Hari ini"})
        # above is checking the user haven't presensi today
        request.data['id_user'] = request.user.id
        request.data['jam_masuk'] = time_now.time().isoformat()
        request.data['tanggal'] = time_now.date().isoformat()
        return super().create(request, *args, **kwargs)

class LogAktivitasViewSet(viewsets.ModelViewSet):
    permission_classes = (IsAuthenticated, DefaultRolePermission)
    queryset = LogAktivitas.objects.all()
    serializer_class = LogAktivitasSerializer
    filter_class = LogAktivitasFilter
    filterset_fields = ['tanggal', 'user']
    search_fields = ['user__username']

    def get_queryset(self):
        if not self.request.user.has_role('Admin', 'Manager'):
            return LogAktivitas.objects.filter(user=self.request.user)
        return super().get_queryset()
        
    def get_serializer_class(self):
        if self.request.method == 'GET':
            return LogAktivitasDetailSerializer
        return super().get_serializer_class()

    def create(self, request, *args, **kwargs):
        request.data['user'] = request.user.id
        return super().create(request, *args, **kwargs)

    def retrieve(self, request, *args, **kwargs):
        return super().retrieve(request, *args, **kwargs)


# from django.shortcuts import render
# from django.http import JsonResponse

# from rest_framework.decorators import api_view
# from rest_framework.response import Response

# from .serializers import *
# from .models import *


# @api_view(['GET'])
# def apiOverview(request):
#     api_urls = {
#         'List' : '/list-presensi/',
#         'Detail Presensi' : '/presensi-detail/<str:pk>/',
#         'Create' : '/presensi-create/',
#     }
#     return Response(api_urls)
    
# @api_view(['GET'])
# def listPresensi(request):
#     presensi = Presensi.objects.all()
#     serializer = PresensiSerializer(presensi, many=True)
#     return Response(serializer.data)

# @api_view(['GET'])
# def listLog(request):
#     log = LogAktivitas.objects.all()
#     serializer = LogAktivitasSerializer(log, many=True)
#     return Response(serializer.data)

# @api_view(['GET'])
# def presensiDetail(request, pk):
#     presensi = Presensi.objects.get(id=pk)
#     serializer = PresensiSerializer(presensi, many=False)
#     return Response(serializer.data)

# @api_view(['GET'])
# def logDetail(request, pk):
#     log = LogAktivitas.objects.get(id=pk)
#     serializer = LogAktivitasSerializer(log, many=False)
#     return Response(serializer.data)

# @api_view(['POST'])
# def presensiCreate(request):
#     serializer = PresensiSerializer(data=request.data)

#     if serializer.is_valid():
#         serializer.save()
    
#     return Response(serializer.data)

# @api_view(['POST'])
# def logCreate(request):
#     serializer = LogAktivitasSerializer(data=request.data)

#     if serializer.is_valid():
#         serializer.save()

#     return Response(serializer.data)

# @api_view(['POST'])
# def logUpdate(request, pk):
#     log = LogAktivitas.objects.get(id=pk)
#     serializer = LogAktivitasSerializer(instance=log, data=request.data)
    
#     if serializer.is_valid():
#         serializer.save()
    
#     return Response(serializer.data)