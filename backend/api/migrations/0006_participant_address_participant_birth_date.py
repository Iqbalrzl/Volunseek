# Generated by Django 5.1.2 on 2024-11-23 11:18

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('api', '0005_remove_participant_email_remove_participant_password_and_more'),
    ]

    operations = [
        migrations.AddField(
            model_name='participant',
            name='address',
            field=models.CharField(blank=True, max_length=255, null=True),
        ),
        migrations.AddField(
            model_name='participant',
            name='birth_date',
            field=models.DateField(blank=True, null=True),
        ),
    ]