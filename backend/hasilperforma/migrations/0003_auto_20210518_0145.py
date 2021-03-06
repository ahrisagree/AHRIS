# Generated by Django 3.1.7 on 2021-05-17 18:45

from django.conf import settings
from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    dependencies = [
        migrations.swappable_dependency(settings.AUTH_USER_MODEL),
        ('borang', '0002_aspekpertanyaan_bobot'),
        ('hasilperforma', '0002_auto_20210517_2350'),
    ]

    operations = [
        migrations.AddField(
            model_name='hasilperforma',
            name='paket',
            field=models.ForeignKey(null=True, on_delete=django.db.models.deletion.SET_NULL, to='borang.paketpertanyaan'),
        ),
        migrations.AlterUniqueTogether(
            name='hasilperforma',
            unique_together={('user', 'paket', 'periode')},
        ),
    ]
