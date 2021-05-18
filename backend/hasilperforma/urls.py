from django.urls import include, path
from .views import *
from rest_framework.routers import DefaultRouter

router = DefaultRouter()
router.register(
  prefix='evaluasi-diri',
  viewset=EvaluasiDiriViewSet,
  basename='evaluasi-diri'
)
router.register(
  prefix='',
  viewset=HasilPerformaViewSet,
  basename='hasil-performa'
)
urlpatterns = router.urls