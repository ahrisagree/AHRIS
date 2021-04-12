from django.urls import include, path
from .views import AssignmentView
from rest_framework.routers import DefaultRouter

router = DefaultRouter()
router.register(
  prefix='',
  viewset=AssignmentView,
  basename='assignment',
)
urlpatterns = router.urls