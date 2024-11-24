# Generated by Django 5.1.2 on 2024-11-23 18:57

import django.db.models.deletion
from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('api', '0006_participant_address_participant_birth_date'),
    ]

    operations = [
        migrations.AlterField(
            model_name='enrollment',
            name='event',
            field=models.ForeignKey(on_delete=django.db.models.deletion.PROTECT, to='api.event'),
        ),
        migrations.AlterField(
            model_name='enrollment',
            name='participant',
            field=models.ForeignKey(on_delete=django.db.models.deletion.PROTECT, to='api.participant'),
        ),
    ]
