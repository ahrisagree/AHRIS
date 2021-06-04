from rest_framework.permissions import BasePermission, SAFE_METHODS 

class AdminPermission(BasePermission):

    def has_permission(self, request, view):
        return bool(request.user.has_role('Admin'))


class IsOwner(BasePermission):

    def has_object_permission(self, request, view, obj):
        return obj.user == request.user

class DefaultRolePermission(BasePermission):

    def has_permission(self, request, view):
        return request.user.has_role('Admin', 'Manager', 'Karyawan', 'Administrasi')

class AdminEditPermission(BasePermission):

    def has_permission(self, request, view):
        if(request.method in SAFE_METHODS):
            return True
        return request.user.has_role('Admin')

class LogAktifitasPermission(BasePermission):

    def has_permission(self, request, view):
        if not request.user.has_role('Manager'):
            data_keys = request.data.keys()
            if 'komentar' in data_keys or 'status_log' in data_keys:
                return False
        return True

    def has_object_permission(self, request, view, obj):
        if request.user.has_role('Manager') and (request.method in SAFE_METHODS or request.method == 'PATCH'):
            return True
        return obj.user == request.user

class HasilPerformaPermission(BasePermission):
    def has_permission(self, request, view):
        if request.method in ['PATCH', 'PUT']:
            return request.user.has_role('Manager')
        if request.method == 'POST':
            return request.user.has_role('Admin')
        return True

class ManagerOnlyEditPermission(BasePermission):
    def has_permission(self, request, view):
        if request.method in ['PATCH', 'PUT']:
            return request.user.has_role('Manager')
        return True

class AdministrasiOnlyPermission(BasePermission):
    def has_permission(self, request, view):
        return request.user.has_role('Administrasi', 'Admin')

class EvaluasiDiriDeletePermission(BasePermission):
    def has_object_permission(self, request, view, obj):
        if request.method == 'DELETE':
            return obj.hasil_performa.user == request.user
        return True