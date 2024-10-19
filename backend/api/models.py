from django.db import models

# Create your models here.
class EventType(models.Model):
    type = models.CharField(max_length=255)

class Event(models.Model):
    title = models.CharField(max_length=255)
    description = models.TextField(null=True,blank=True)
    start_date = models.DateField()
    end_date = models.DateField()
    location = models.CharField(max_length=255)
    event_type = models.ForeignKey(EventType, on_delete= models.SET_NULL, null=True)

class Participant(models.Model):
    username = models.CharField(max_length=255)
    password = models.CharField(max_length=8)
    email = models.EmailField(unique=True)

class Enrollment(models.Model):
    participant = models.ForeignKey(Participant,on_delete=models.CASCADE)
    event = models.ForeignKey(Event, on_delete=models.CASCADE)
    enrollment_date = models.DateField(auto_now_add=True)
    