from django.urls import include, path
from borang.views import *
from rest_framework.routers import DefaultRouter

router = DefaultRouter()
router.register(
  prefix='presensi',
  viewset=PresensiViewSet,
  basename='presensi',
)
router.register(
  prefix='logaktivitas',
  viewset=LogAktivitasViewSet,
  basename='logaktivitas'
)
urlpatterns = router.urls