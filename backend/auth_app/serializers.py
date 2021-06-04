from rest_framework import serializers
from django.utils.translation import ugettext_lazy as _
from allauth.account.adapter import get_adapter
from allauth.account.utils import setup_user_email
from rest_auth.registration.serializers import RegisterSerializer as RestRegisterSerializer
from backend.utils import get_or_none
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
	nama_divisi = serializers.CharField(max_length=100, required=False)
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

	def validate_divisi(self, divisi):
		divisi_list = []
		for div in divisi:
			divisi_obj = get_or_none(Division, **div)
			if divisi_obj == None:
				if div.get('nama_divisi', None) != None:
					divisi_obj = Division.objects.create(nama_divisi=div['nama_divisi'])
				else:
					continue
			divisi_list.append(divisi_obj)
		return divisi_list

	def update(self, instance, validated_data):
		divisi = validated_data.pop('divisi')
		updated_division = []
		instance.divisi.set(divisi)
		return super().update(instance, validated_data)

class RegisterSerializer(RestRegisterSerializer):
	role = serializers.CharField(max_length=20, required=True)
	divisi = DivisionSerializer(many=True)

	def validate_role(self, role):
		if role not in roles:
			raise serializers.ValidationError(_("Invalid Role"))
		return role

	def validate_divisi(self, divisi):
		print(divisi)
		divisi_list = []
		for div in divisi:
			divisi_obj = get_or_none(Division, **div)
			if divisi_obj == None:
				if div.get('nama_divisi', None) != None:
					divisi_obj = Division.objects.get_or_create(nama_divisi=div['nama_divisi'])[0]
				else:
					continue
			divisi_list.append(divisi_obj)
		return divisi_list

	def custom_signup(self, request, user):
		print("duluan salah")
		role = self.validated_data.get('role', '')
		setattr(user, 'role', role)
		divisi = self.validated_data.get('divisi')
		user.divisi.set(divisi)
		gaji = self.validated_data.get('gaji')
		setattr(user, 'gaji', gaji)
		user.save()