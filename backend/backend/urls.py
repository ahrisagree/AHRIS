"""backend URL Configuration

The `urlpatterns` list routes URLs to views. For more information please see:
    https://docs.djangoproject.com/en/3.1/topics/http/urls/
Examples:
Function views
    1. Add an import:  from my_app import views
    2. Add a URL to urlpatterns:  path('', views.home, name='home')
Class-based views
    1. Add an import:  from other_app.views import Home
    2. Add a URL to urlpatterns:  path('', Home.as_view(), name='home')
Including another URLconf
    1. Import the include() function: from django.urls import include, path
    2. Add a URL to urlpatterns:  path('blog/', include('blog.urls'))
"""
from django.contrib import admin
from django.urls import path, include

urlpatterns = [
    path('admin/', admin.site.urls),
    path('auth/', include('auth_app.urls.auth')),
    path('user/', include('auth_app.urls.user')),
    path('divisi/', include('auth_app.urls.divisi')),
    path('evaluation/pertanyaan/', include('borang.urls')),
    path('evaluation/assign/', include('assign.urls')),
    path('evaluation/jawaban/', include('jawaban.urls')),
    path('evaluation/result/', include('hasilperforma.urls')),
    path('log/', include('log.urls')),
    path('gaji/', include('gaji.urls'))
]
