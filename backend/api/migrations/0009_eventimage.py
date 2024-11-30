# Generated by Django 5.1.2 on 2024-11-30 14:37

import django.db.models.deletion
from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('api', '0008_alter_enrollment_event_alter_enrollment_participant_and_more'),
    ]

    operations = [
        migrations.CreateModel(
            name='EventImage',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('image', models.ImageField(upload_to='event/images')),
                ('event', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, related_name='image', to='api.event')),
            ],
        ),
    ]