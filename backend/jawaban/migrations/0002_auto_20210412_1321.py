# Generated by Django 3.1.7 on 2021-04-12 06:21

from django.conf import settings
from django.db import migrations


class Migration(migrations.Migration):

    dependencies = [
        migrations.swappable_dependency(settings.AUTH_USER_MODEL),
        ('jawaban', '0001_initial'),
    ]

    operations = [
        migrations.AlterUniqueTogether(
            name='assignment',
            unique_together={('user_penilai', 'user_dinilai', 'periode')},
        ),
    ]