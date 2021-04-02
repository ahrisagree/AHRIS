from rest_framework import serializers
from django.utils.translation import ugettext_lazy as _
from allauth.account.adapter import get_adapter
from allauth.account.utils import setup_user_email
from rest_auth.registration.serializers import RegisterSerializer as RestRegisterSerializer
from .roles import roles
from .models import AppUser, Division

class UserSerializer(serializers.ModelSerializer):
	class Meta:
		model = AppUser
		fields = ('pk', 'username', 'email', 'role', 'divisi', 'gaji')
		read_only_fields = ('email', 'role', 'divisi', 'gaji')
		depth = 1

class DivisionSerializer(serializers.ModelSerializer):
	id = serializers.IntegerField(required=True)
	class Meta:
		model = Division
		fields = '__all__'

class UserListSerializer(serializers.ModelSerializer):
	divisi = DivisionSerializer(many=True)
	class Meta:
		model = AppUser
		fields = ('pk', 'username', 'email', 'role', 'divisi')
		depth = 1

class UserEditSerializer(serializers.ModelSerializer):
	divisi = DivisionSerializer(many=True)
	class Meta:
		model = AppUser
		fields = ('pk', 'username', 'email', 'role', 'divisi', 'gaji')
		read_only_fields = ('email',)
		depth = 1

	def update(self, instance, validated_data):
		divisi = validated_data.pop('divisi')
		updated_division = []
		for div in divisi:
			updated_division.append(Division.objects.get(id=div['id']))
		instance.divisi.set(updated_division)
		return super().update(instance, validated_data)

class RegisterSerializer(RestRegisterSerializer):
	role = serializers.CharField(max_length=20, required=True)
	divisi = serializers.ListField(
			child = serializers.IntegerField()
		)

	def validate_role(self, role):
		if role not in roles:
			raise serializers.ValidationError(_("Invalid Role"))
		return role

	def validate_divisi(self, divisi):
		for div_id in divisi:
			if not Division.objects.filter(id=div_id).exists():
				raise serializers.ValidationError(
					_("Divisi {} does not exist".format(div_id))
					)
		return divisi

	def custom_signup(self, request, user):
		role = self.validated_data.get('role', '')
		setattr(user, 'role', role)
		divisi = self.validated_data.get('divisi')
		list_divisi = []
		for div_id in divisi:
			list_divisi.append(Division.objects.get(id=div_id))
		user.divisi.set(list_divisi)
		user.save()