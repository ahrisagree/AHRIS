from rest_framework import viewsets, mixins
from rest_framework.permissions import IsAuthenticated
from .models import *
from .serializers import *
from auth_app.permissions import *

class NotificationViewSet(viewsets.ReadOnlyModelViewSet):
  permission_classes = (IsAuthenticated, DefaultRolePermission)
  serializer_class = NotificationSerializer

  def get_queryset(self):
    return Notification.objects.filter(user=self.request.user).order_by('-timestamp')
