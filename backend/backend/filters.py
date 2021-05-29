from django_filters import Filter, FilterSet, filters
from django.forms import widgets
from auth_app.models import AppUser

class CharMultipleFilter(filters.BaseInFilter, filters.CharFilter):
  # This allow filter multiple with comma (,) separation
  pass

class NumberMultipleFilter(filters.BaseInFilter, filters.NumberFilter):
  pass

class PeriodeFilter(filters.DateFilter):
  # widget=widgets.DateInput(attrs={'type': 'month'})
  def filter(self, qs, value):
    if value:
        filter_lookups = {
            "%s__month" % (self.field_name, ): value.month,
            "%s__year" % (self.field_name, ): value.year
        }
        qs = qs.filter(**filter_lookups).distinct()
    return qs

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
  dinilaiAssigned = filters.NumberFilter(field_name='list_assignment__user_dinilai__id', distinct=True)
  penilaiAssigned = filters.NumberFilter(field_name='list_assignment__user_penilai__id', distinct=True)
  periodeAssigned = PeriodeFilter(field_name='list_assignment__periode', distinct=True)

class AssignmentFilter(FilterSet):
  user_dinilai = filters.NumberFilter(field_name='user_dinilai__id')
  user_penilai = filters.NumberFilter(field_name='user_penilai__id')
  periode = PeriodeFilter(field_name='periode')
  paket_pertanyaan = filters.NumberFilter(field_name='list_paket_pertanyaan__id')

class PresensiFilter(FilterSet):
  tanggal = filters.DateFilter()
  user = NumberMultipleFilter(
    field_name='user__id',
    lookup_expr='in'
  )
  periode = PeriodeFilter(field_name='tanggal')
  date = filters.DateFromToRangeFilter(field_name='tanggal')
  divisi = CharMultipleFilter(
    field_name='user__divisi__nama_divisi',
    lookup_expr='in'
  )

class LogAktivitasFilter(FilterSet):
  tanggal = filters.DateFilter()
  user = filters.NumberFilter(field_name='user__id')
  periode = PeriodeFilter(field_name='tanggal')
  status = filters.NumberFilter(field_name='status_log')
  is_lembur = filters.BooleanFilter(field_name='is_lembur')
  penyetuju = filters.NumberFilter(field_name='manajer_penyetuju__id')
  date = filters.DateFromToRangeFilter(field_name='tanggal')
  divisi = CharMultipleFilter(
    field_name='user__divisi__nama_divisi',
    lookup_expr='in'
  )

class GajiFilter(FilterSet):
  periode = PeriodeFilter(field_name='periode')
  role = filters.CharFilter(field_name='user__role')
  divisi = CharMultipleFilter(
    field_name='user__divisi__nama_divisi',
    lookup_expr='in'
  )
  
class HasilPerformaFilter(FilterSet):
  periode = PeriodeFilter(field_name='periode')
  divisi = CharMultipleFilter(
    field_name='user__divisi__nama_divisi',
    lookup_expr='in'
  )
  user = filters.NumberFilter(field_name='user__id')