# Generated by Django 3.1.7 on 2021-04-23 11:26

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('log', '0012_logaktivitas_manajer_penyetuju'),
    ]

    operations = [
        migrations.AddField(
            model_name='logaktivitas',
            name='notes',
            field=models.CharField(default='', max_length=50),
        ),
    ]