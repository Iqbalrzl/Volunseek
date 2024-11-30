from django.db import models
from django.conf import settings
from django.core.exceptions import ValidationError
from django.core.validators import MinValueValidator

# Create your models here.


class EventType(models.Model):
    type = models.CharField(max_length=255, unique=True)

    def __str__(self):
        return self.type

    class Meta:
        ordering = ['type']


class Event(models.Model):
    title = models.CharField(max_length=255)
    max_participants = models.IntegerField(default=0)
    description = models.TextField(null=True, blank=True)
    start_date = models.DateField()
    end_date = models.DateField()
    location = models.CharField(max_length=255)
    event_type = models.ForeignKey(
        EventType, on_delete=models.SET_NULL, null=True, blank=True, related_name='event_type')

    def __str__(self):
        return self.title

    class Meta:
        ordering = ['title']


class EventDetail(models.Model):
    event = models.OneToOneField(
        Event, on_delete=models.CASCADE, primary_key=True, related_name='event_detail')
    task = models.TextField(null=True, blank=True)
    tools = models.TextField(null=True, blank=True)
    information = models.TextField(null=True, blank=True)

    def __str__(self):
        return self.event.title


class EventImage(models.Model):
    event = models.ForeignKey(
        Event, on_delete=models.CASCADE, related_name='image')
    image = models.ImageField(upload_to='event/images')


class Participant(models.Model):
    user = models.OneToOneField(
        settings.AUTH_USER_MODEL, on_delete=models.CASCADE, related_name='user')
    birth_date = models.DateField(blank=True, null=True)
    address = models.CharField(max_length=255, blank=True, null=True)

    def __str__(self):
        return self.user.username


class Enrollment(models.Model):
    participant = models.ForeignKey(
        Participant, on_delete=models.PROTECT, related_name='participant')
    event = models.ForeignKey(
        Event, on_delete=models.PROTECT, related_name='event')
    enrollment_date = models.DateField(auto_now_add=True)

    def clean(self):
        duplicate_enrollment = Enrollment.objects.filter(
            event=self.event).filter(participant=self.participant)
        if duplicate_enrollment.exists():
            raise ValidationError("Participant has enrolled this event")

        current_num_participants = Enrollment.objects.filter(
            event=self.event).count()
        if current_num_participants >= self.event.max_participants:
            raise ValidationError(
                "The maximum number of participants for this event has been reached")

    def save(self, *args, **kwargs):
        self.clean()
        super().save(*args, **kwargs)
