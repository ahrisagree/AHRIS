from django.urls import include, path
from auth_app.views import DivisiViewSet
from rest_framework.routers import DefaultRouter

router = DefaultRouter()
router.register(
  prefix='',
  viewset=DivisiViewSet,
  basename='division'
)

urlpatterns = router.urls