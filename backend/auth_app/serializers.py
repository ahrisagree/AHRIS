from rest_framework import serializers
from django.utils.translation import ugettext_lazy as _
from allauth.account.adapter import get_adapter
from allauth.account.utils import setup_user_email
from rest_auth.registration.serializers import RegisterSerializer as RestRegisterSerializer
from .roles import roles
from .models import AppUser

class UserSerializer(serializers.HyperlinkedModelSerializer):
  class Meta:
    model = AppUser
    fields = ('pk', 'username', 'email', 'role')
    read_only_fields = ('email', 'role')

class UserEditSerializer(serializers.HyperlinkedModelSerializer):
    class Meta:
        model = AppUser
        fields = ('pk', 'username', 'email', 'role')
        read_only_fields = ('email',)

class RegisterSerializer(RestRegisterSerializer):
	role = serializers.CharField(max_length=20, required=True)

	def validate_role(self, role):
		if role not in roles:
			raise serializers.ValidationError(_("Invalid Role"))
		return role

	def custom_signup(self, request, user):
		role = self.validated_data.get('role', '')
		setattr(user, 'role', role)
		user.save()