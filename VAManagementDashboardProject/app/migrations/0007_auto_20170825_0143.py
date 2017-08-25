# -*- coding: utf-8 -*-
# Generated by Django 1.11.2 on 2017-08-24 23:43
from __future__ import unicode_literals

from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    dependencies = [
        ('app', '0006_auto_20170816_1342'),
    ]

    operations = [
        migrations.AlterField(
            model_name='privileges',
            name='User',
            field=models.ForeignKey(null=True, on_delete=django.db.models.deletion.CASCADE, to='app.UserVA'),
        ),
        migrations.AlterField(
            model_name='privileges',
            name='VAMaster',
            field=models.ForeignKey(null=True, on_delete=django.db.models.deletion.CASCADE, to='app.VAMaster'),
        ),
        migrations.AlterField(
            model_name='vamaster',
            name='DataCenter',
            field=models.ForeignKey(null=True, on_delete=django.db.models.deletion.SET_NULL, to='app.DataCenter'),
        ),
    ]
