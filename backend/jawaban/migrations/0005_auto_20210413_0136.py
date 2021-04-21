# Generated by Django 3.1.7 on 2021-04-12 18:36

from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    dependencies = [
        ('borang', '0002_auto_20210409_0006'),
        ('jawaban', '0004_auto_20210413_0129'),
    ]

    operations = [
        migrations.AddField(
            model_name='paketjawaban',
            name='paket_pertanyaan',
            field=models.ForeignKey(null=True, on_delete=django.db.models.deletion.SET_NULL, to='borang.paketpertanyaan'),
        ),
        migrations.AlterField(
            model_name='aspekjawaban',
            name='paket',
            field=models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, related_name='list_aspek', to='jawaban.paketjawaban'),
        ),
        migrations.AlterField(
            model_name='jawaban',
            name='aspek',
            field=models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, related_name='list_jawaban', to='jawaban.aspekjawaban'),
        ),
    ]
