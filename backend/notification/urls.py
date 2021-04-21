from django.urls import include, path
from .views import *
from rest_framework.routers import DefaultRouter

router = DefaultRouter()
router.register(
  prefix='',
  viewset=NotificationViewSet,
  basename='notifikasi'
)
urlpatterns = router.urls