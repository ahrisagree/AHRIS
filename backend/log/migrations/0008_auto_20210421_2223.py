# Generated by Django 3.1.7 on 2021-04-21 15:23

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('log', '0007_auto_20210421_2116'),
    ]

    operations = [
        migrations.AlterField(
            model_name='logaktivitas',
            name='status_log',
            field=models.IntegerField(choices=[(0, 'pending'), (1, 'disetujui'), (2, 'ditolak')], default=0),
        ),
    ]