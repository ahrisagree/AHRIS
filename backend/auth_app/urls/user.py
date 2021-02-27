from django.urls import include, path
from auth_app.views import UserViewSet
from rest_framework.routers import DefaultRouter

router = DefaultRouter()
router.register(
  prefix='',
  viewset=UserViewSet,
  basename='users'
)

urlpatterns = router.urls