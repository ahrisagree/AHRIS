from django.db import models
from django.contrib.auth.models import AbstractUser
from django.contrib.auth.base_user import BaseUserManager
from django.contrib.auth.validators import UnicodeUsernameValidator
from django.utils.translation import ugettext_lazy as _

"""
in this file:
- CustomUserManager
- Model Divisi
- Model User
"""

class CustomUserManager(BaseUserManager):
    """
    Custom user model manager where email is the unique identifiers
    for authentication instead of usernames.
    """
    def create_user(self, email, password, **extra_fields):
        """
        Create and save a User with the given email and password.
        """
        if not email:
            raise ValueError(_('The Email must be set'))
        email = self.normalize_email(email)
        user = self.model(email=email, **extra_fields)
        user.set_password(password)
        user.save()
        return user

    def create_superuser(self, email, password, **extra_fields):
        """
        Create and save a SuperUser with the given email and password.
        """
        extra_fields.setdefault('is_staff', True)
        extra_fields.setdefault('is_superuser', True)
        extra_fields.setdefault('is_active', True)
        extra_fields.setdefault('role', 'Admin')

        if extra_fields.get('is_staff') is not True:
            raise ValueError(_('Superuser must have is_staff=True.'))
        if extra_fields.get('is_superuser') is not True:
            raise ValueError(_('Superuser must have is_superuser=True.'))
        return self.create_user(email, password, **extra_fields)

class Division(models.Model):
    nama_divisi = models.CharField(max_length=100)

    def __str__(self):
        return self.nama_divisi

class AppUser(AbstractUser):
	username = models.CharField(
		error_messages={'unique': 'A user with that username already exists.'}, 
		help_text='Required. 150 characters or fewer. Letters, digits and @/./+/-/_ only.', 
		max_length=150, unique=True, blank=True, null=True, default=None,
		verbose_name='username')
	email = models.EmailField(_('email address'), unique=True)
	role = models.CharField(max_length=20, default='Guest')
	divisi = models.ManyToManyField(Division)
	gaji = models.IntegerField(default=0)

	USERNAME_FIELD = 'email'
	REQUIRED_FIELDS = ['role']

	objects = CustomUserManager()

	def __str__(self):
		return "{} - {} | {}".format(self.username, self.email, self.role)

	def has_role(self, *roles):
		return bool(self.role in roles)