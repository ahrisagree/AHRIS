# Generated by Django 3.1.7 on 2021-05-23 09:24

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('log', '0006_auto_20210512_2013'),
    ]

    operations = [
        migrations.AlterField(
            model_name='logaktivitas',
            name='keterangan',
            field=models.CharField(blank=True, default='', max_length=50, null=True),
        ),
        migrations.AlterField(
            model_name='logaktivitas',
            name='notes',
            field=models.CharField(blank=True, default='', max_length=50, null=True),
        ),
    ]