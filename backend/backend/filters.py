from django_filters import Filter, FilterSet, filters
from auth_app.models import AppUser

# class M2MFilter(Filter):

#   def filter(self, qs, value):
#     if not value:
#       return qs
#     values = value.split(',')
#     for v in values:
#       qs = qs.filter(labels=v)
#     return qs

# class UserFilter(FilterSet):
#   role = M2MFilter(name='role')
#   divisi = M2MFilter(name='divisi__nama_divisi')

#   class Meta:
#     model = AppUser
#     fields = ('role', 'divisi')

class CharMultipleFilter(filters.BaseInFilter, filters.CharFilter):
  pass

class UserFilter(FilterSet):
  divisi = CharMultipleFilter(
    field_name='divisi__nama_divisi',
    lookup_expr='in'
  )
  role = filters.CharFilter()

class BorangFilter(FilterSet):
  kategori = CharMultipleFilter(
    field_name='kategori__nama',
    lookup_expr='in'
  )
  jenis = filters.CharFilter()