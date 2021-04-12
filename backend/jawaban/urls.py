from django.urls import include, path
from .views import *
from rest_framework.routers import DefaultRouter

router = DefaultRouter()
router.register(
  prefix='',
  viewset=PaketJawabanViewSet,
  basename='jawaban'
)
urlpatterns = router.urls