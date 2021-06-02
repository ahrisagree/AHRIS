from django.urls import include
from .views import *
from rest_framework.routers import DefaultRouter

router = DefaultRouter()
router.register(
  prefix='',
  viewset=GajiViewSet,
  basename='gaji'
)
urlpatterns = router.urls