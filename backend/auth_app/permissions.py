from rest_framework.permissions import BasePermission, SAFE_METHODS 

class AdminPermission(BasePermission):

    def has_permission(self, request, view):
        return bool(request.user.has_role('Admin'))


class IsOwner(BasePermission):

    def has_object_permission(self, request, view, obj):
        return obj.owner == request.user

class DefaultRolePermission(BasePermission):

    def has_permission(self, request, view):
        return request.user.has_role('Admin', 'Manajer', 'Karyawan')

class AdminEditPermission(BasePermission):

    def has_permission(self, request, view):
        if(request.method in SAFE_METHODS):
            return True
        return request.user.has_role('Admin')
