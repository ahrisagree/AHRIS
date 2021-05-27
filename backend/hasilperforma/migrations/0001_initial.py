# Generated by Django 3.1.7 on 2021-05-15 19:20

import datetime
from django.conf import settings
from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    initial = True

    dependencies = [
        migrations.swappable_dependency(settings.AUTH_USER_MODEL),
    ]

    operations = [
        migrations.CreateModel(
            name='HasilPerforma',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('komentar', models.TextField(blank=True, null=True)),
                ('periode', models.DateField()),
                ('skor', models.IntegerField()),
                ('deskripsi', models.TextField(blank=True, null=True)),
                ('nama', models.CharField(max_length=255)),
                ('manager_komentator', models.ForeignKey(null=True, on_delete=django.db.models.deletion.SET_NULL, to=settings.AUTH_USER_MODEL)),
                ('user', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, related_name='hasil_performas', to=settings.AUTH_USER_MODEL)),
            ],
        ),
        migrations.CreateModel(
            name='EvaluasiDiri',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('tanggal', models.DateField(default=datetime.date.today)),
                ('current_performance', models.TextField()),
                ('to_do', models.TextField()),
                ('parameter', models.TextField()),
                ('feedback', models.TextField(blank=True, null=True)),
                ('hasil_performa', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, related_name='evaluasi_diri', to='hasilperforma.hasilperforma')),
                ('manager_feedbacker', models.ForeignKey(null=True, on_delete=django.db.models.deletion.SET_NULL, to=settings.AUTH_USER_MODEL)),
            ],
        ),
        migrations.CreateModel(
            name='AspekHasilPerforma',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('nama', models.CharField(max_length=255)),
                ('skor', models.IntegerField()),
                ('deskripsi', models.TextField(blank=True, null=True)),
                ('hasil_performa', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, related_name='list_aspek', to='hasilperforma.hasilperforma')),
            ],
        ),
    ]
