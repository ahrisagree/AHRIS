# from django.urls import include, path
# from borang.views import *
# from rest_framework.routers import DefaultRouter

# router = DefaultRouter()
# router.register(
#   prefix='presensi',
#   viewset=PresensiViewSet,
#   basename='presensi',
# )
# router.register(
#   prefix='logaktivitas',
#   viewset=LogAktivitasViewSet,
#   basename='logaktivitas'
# )
# urlpatterns = router.urls


from django.urls import path
from . import views

urlpatterns = [
  path('', views.apiOverview, name="api-overview"),
  path('list-presensi/', views.listPresensi, name="list-presensi"),
  path('list-log/', views.listLog, name="list-log"),
  path('presensi-detail/<str:pk>/', views.presensiDetail, name="presensi-detail"),
  path('log-detail/<str:pk>/', views.logDetail, name="log-detail"),
  path('presensi-create/', views.presensiCreate, name="presensi-create"),
  path('log-create/', views.logCreate, name="log-create"),
  path('log-update/<str:pk>/', views.logUpdate, name="log-update"),
  # path('presensi-delete/<str:pk>/', views.presensiDelete, name="presensi-delete"),
]