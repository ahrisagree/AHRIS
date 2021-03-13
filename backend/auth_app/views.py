from rest_framework import status, generics, viewsets
from rest_auth.registration.views import RegisterView as RestAuthRegisterView
from rest_auth.views import LoginView as RestAuthLoginView
from rest_auth.views import UserDetailsView as RestUserDetailsView
from rest_auth.views import PasswordChangeView
from auth_app.utils import create_knox_token, KnoxSerializer
from rest_framework.response import Response
from rest_framework.permissions import IsAuthenticated

from .models import AppUser
from .serializers import UserSerializer
from .permissions import DefaultRolePermission, IsOwner, AdminPermission

class LoginView(RestAuthLoginView):

    def get_response(self):
        serializer_class = self.get_response_serializer()
        data = {'user': self.user, 'token': self.token[-1]}
        serializer = serializer_class(instance=data, context={'request': self.request})
        return Response(serializer.data, status=status.HTTP_200_OK)


class RegisterView(RestAuthRegisterView):
    permission_classes = (IsAuthenticated, AdminPermission)

    def get_response_data(self, user):
        return KnoxSerializer({'user': user, 'token': self.token[-1]}).data

    def perform_create(self, serializer):
        user = serializer.save(self.request)
        self.token = create_knox_token(None, user, None)
        # complete_signup(self.request._request, user, allauth_settings.EMAIL_VERIFICATION, None)
        return user


class AccountPasswordChangeView(PasswordChangeView):

    def post(self, request, *args, **kwargs):
        user = request.user
        return super(AccountPasswordChangeView, self).post(request, *args, **kwargs)

class UserDetailsView(RestUserDetailsView):
    serializer_class = UserSerializer

class UserViewSet(viewsets.ReadOnlyModelViewSet):
    permission_classes = (DefaultRolePermission,)
    queryset = AppUser.objects.all()
    serializer_class = UserSerializer
    pagination_class = None
