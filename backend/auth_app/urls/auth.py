from django.urls import include, path
from knox.views import LogoutAllView, LogoutView

from auth_app.views import (
    AccountPasswordChangeView, 
    LoginView, RegisterView, UserDetailsView )

urlpatterns = [
    path('accounts/registration/', RegisterView.as_view(), name='register-account'),
    path('login/', LoginView.as_view(), name='login'),
    path('logout/', LogoutView.as_view(), name='logout'),
    path('logoutall/', LogoutAllView.as_view(), name='logoutall'),
    path('password/reset/', include('django_rest_passwordreset.urls')),
    path('password/change/', AccountPasswordChangeView.as_view(), name='password-change'),
    path('accounts/', UserDetailsView.as_view(), name='password-change'),
]
