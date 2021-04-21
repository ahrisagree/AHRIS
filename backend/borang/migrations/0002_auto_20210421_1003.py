# Generated by Django 3.1.7 on 2021-04-21 03:03

from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    dependencies = [
        ('borang', '0001_initial'),
    ]

    operations = [
        migrations.AlterField(
            model_name='aspekpertanyaan',
            name='paket',
            field=models.ForeignKey(null=True, on_delete=django.db.models.deletion.SET_NULL, related_name='list_aspek', to='borang.paketpertanyaan'),
        ),
        migrations.AlterField(
            model_name='pertanyaan',
            name='aspek',
            field=models.ForeignKey(null=True, on_delete=django.db.models.deletion.SET_NULL, related_name='list_pertanyaan', to='borang.aspekpertanyaan'),
        ),
    ]
