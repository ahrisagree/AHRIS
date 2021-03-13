from knox.models import AuthToken, AuthTokenManager
from rest_framework import serializers
from .serializers import UserSerializer
from knox.settings import knox_settings

class KnoxSerializer(serializers.Serializer):
    token = serializers.CharField()
    user = UserSerializer()

def create_knox_token(token_model, user, serializer):
    old_token = AuthToken.objects.filter(user = user)
    # give check for another token exist
    if old_token.exists():
        old_token.delete()
    token = AuthToken.objects.create(user=user)
    return token


