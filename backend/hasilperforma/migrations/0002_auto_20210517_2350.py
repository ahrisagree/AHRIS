# Generated by Django 3.1.7 on 2021-05-17 16:50

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('hasilperforma', '0001_initial'),
    ]

    operations = [
        migrations.AlterField(
            model_name='aspekhasilperforma',
            name='skor',
            field=models.FloatField(),
        ),
        migrations.AlterField(
            model_name='hasilperforma',
            name='skor',
            field=models.FloatField(),
        ),
    ]
