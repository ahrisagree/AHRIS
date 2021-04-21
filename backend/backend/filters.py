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
  # This allow filter multiple with comma (,) separation
  pass

class NumberMultipleFilter(filters.BaseInFilter, filters.NumberFilter):
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

class AssignmentFilter(FilterSet):
  user_dinilai = filters.NumberFilter(field_name='user_dinilai__id')
  user_penilai = filters.NumberFilter(field_name='user_penilai__id')
  periode = filters.DateFilter()
  paket_pertanyaan = filters.NumberFilter(field_name='list_paket_pertanyaan__id')

class PresensiFilter(FilterSet):
  tanggal = filters.DateFilter()
  user = NumberMultipleFilter(
    field_name='id_user__id',
    lookup_expr='in'
  )
  