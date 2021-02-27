from knox.models import AuthToken
from rest_framework import serializers
from .serializers import UserSerializer

class KnoxSerializer(serializers.Serializer):
    token = serializers.CharField()
    user = UserSerializer()

def create_knox_token(token_model, user, serializer):
    token = AuthToken.objects.create(user=user)
    return token

