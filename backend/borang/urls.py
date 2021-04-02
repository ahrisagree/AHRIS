from django.urls import include, path
from borang.views import *
from rest_framework.routers import DefaultRouter

router = DefaultRouter()
router.register(
  prefix='kategori',
  viewset=KategoriViewSet,
  basename='kategori',
)
router.register(
  prefix='paket',
  viewset=PaketPertanyaanViewSet,
  basename='paket'
)
urlpatterns = router.urls