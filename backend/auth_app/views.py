from rest_framework import status, generics, viewsets, mixins
from rest_auth.registration.views import RegisterView as RestAuthRegisterView
from rest_auth.views import LoginView as RestAuthLoginView
from rest_auth.views import UserDetailsView as RestUserDetailsView
from rest_auth.views import PasswordChangeView
from auth_app.utils import create_knox_token, KnoxSerializer
from rest_framework.response import Response
from rest_framework.permissions import IsAuthenticated
from backend.utils import QueryBuilder
from backend.filters import UserFilter
from .models import AppUser, Division
from .serializers import *
from .permissions import *

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
    http_method_names = ('get', 'patch')
    serializer_class = UserSerializer

class UserViewSet(
        mixins.UpdateModelMixin,
        mixins.DestroyModelMixin,
        viewsets.ReadOnlyModelViewSet):
    permission_classes = (IsAuthenticated, DefaultRolePermission, AdminEditPermission)
    http_method_names = ('get', 'patch', 'delete')
    queryset = AppUser.objects.all()
    filter_class = UserFilter
    filterset_fields = ['divisi', 'role']
    search_fields = ['username']

    def list(self, request, *args, **kwargs):
        if request.query_params.get('disablepagination') != None:
            self.pagination_class = None
        return super().list(request, *args, **kwargs)

    # def filter_queryset(self, queryset):
    #     q_divisi = self.request.query_params.get('divisi')
    #     queryset.filter('divisi__nama_divisi__in', q_divisi)
    #     return super().filter_queryset(queryset)
    # def get_queryset(self):
    #     q_divisi = self.request.query_params.get('divisi')
    #     q_nama = self.request.query_params.get('nama')
    #     q_role = self.request.query_params.get('role')
    #     filter = (QueryBuilder()
    #         ._('divisi__nama_divisi__in', q_divisi, True)
    #         ._('username__icontains', q_nama)
    #         ._('role__in', q_role, True))
    #     return AppUser.objects.filter(**filter.build()).distinct()

    def get_serializer_class(self):
        if self.request.user.has_role('Admin'):
            return UserEditSerializer
        return UserListSerializer


class DivisiViewSet(viewsets.ReadOnlyModelViewSet):
    queryset = Division.objects.all()
    pagination_class = None
    serializer_class = DivisionSerializer
