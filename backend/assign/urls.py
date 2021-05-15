from django.urls import include, path
from .views import AssignmentView, ScoringView
from rest_framework.routers import DefaultRouter

router = DefaultRouter()
router.register(
  prefix='',
  viewset=AssignmentView,
  basename='assignment',
)
urlpatterns = router.urls + [
  path('score/<int:assignment__user_dinilai__pk>/<int:paket_pertanyaan__id>', 
  ScoringView.as_view())
]