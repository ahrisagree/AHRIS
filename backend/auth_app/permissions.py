from rest_framework import permissions


class AdminPermission(permissions.BasePermission):

    def has_permission(self, request, view):
        return bool(request.user.role == "Admin")


class IsOwner(permissions.BasePermission):

    def has_object_permission(self, request, view, obj):
        return obj.owner == request.user

class DefaultRolePermission(permissions.BasePermission):

    def has_permission(self, request, view):
        return request.user.has_role('Admin', 'Manajer', 'Karyawan')

