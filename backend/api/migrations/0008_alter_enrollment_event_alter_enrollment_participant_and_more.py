# Generated by Django 5.1.2 on 2024-11-25 13:08

import django.db.models.deletion
from django.conf import settings
from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('api', '0007_alter_enrollment_event_alter_enrollment_participant'),
        migrations.swappable_dependency(settings.AUTH_USER_MODEL),
    ]

    operations = [
        migrations.AlterField(
            model_name='enrollment',
            name='event',
            field=models.ForeignKey(on_delete=django.db.models.deletion.PROTECT, related_name='event', to='api.event'),
        ),
        migrations.AlterField(
            model_name='enrollment',
            name='participant',
            field=models.ForeignKey(on_delete=django.db.models.deletion.PROTECT, related_name='participant', to='api.participant'),
        ),
        migrations.AlterField(
            model_name='participant',
            name='user',
            field=models.OneToOneField(on_delete=django.db.models.deletion.CASCADE, related_name='user', to=settings.AUTH_USER_MODEL),
        ),
    ]