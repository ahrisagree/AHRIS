# Generated by Django 3.1.7 on 2021-04-02 09:40

from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    initial = True

    dependencies = [
    ]

    operations = [
        migrations.CreateModel(
            name='Presensi',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('tanggal', models.DateField(format="%d-%m-%Y", input_formats=['%d-%m-%Y', 'iso-8601'])),
                ('jam_masuk', models.TimeField(format='%I:%M %p', input_formats='%I:%M %p')),
                ('keterangan', models.CharField(max_length=100)),
                ('log', models.ForeignKey(null=True, on_delete=django.db.models.deletion.SET_NULL, to='log.logaktivitas')),
            ],
        ),
        migrations.CreateModel(
            name='LogAktivitas',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('tanggal', models.DateField(format="%d-%m-%Y", input_formats=['%d-%m-%Y', 'iso-8601'])),
                ('jam_masuk', models.TimeField(format='%I:%M %p', input_formats='%I:%M %p')),
                ('jam_keluar', models.TimeField(format='%I:%M %p', input_formats='%I:%M %p')),
                ('keterangan', models.CharField(max_length=50)),
                ('aktivitas', models.CharField(max_length=250)),
                ('link_deliverable', models.CharField(max_length=250)),
                ('status_deliverable', models.CharField(max_length=50)),
                ('tipe_log', models.CharField(max_length=35)),
                ('status_log', models.CharField(max_length=35)),
                ('komentar', models.CharField(max_length=250)),
                ('manajer_penyetuju', models.ForeignKey(null=True, on_delete=django.db.models.deletion.SET_NULL, to='user.user')), # harus dicek lagi
                ('alasan_lembur', models.CharField(max_length=250)),
            ],
        ),
    ]