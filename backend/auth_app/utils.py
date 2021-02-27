from knox.models import AuthToken
from rest_framework import serializers
from rest_auth.serializers import UserDetailsSerializer


class KnoxSerializer(serializers.Serializer):
    token = serializers.CharField()
    user = UserDetailsSerializer()

def create_knox_token(token_model, user, serializer):
    token = AuthToken.objects.create(user=user)
    return token

