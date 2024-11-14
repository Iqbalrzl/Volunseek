from datetime import date
from django.contrib import admin
from .models import *

# Register your models here.


@admin.register(Event)
class EventAdmin(admin.ModelAdmin):
    list_display = ['title', 'event_type', 'description',
                    'start_date', 'end_date', 'location', 'status']
    list_editable = ['event_type']
    list_select_related = ['event_type']

    def status(self, event):
        if date.today() > event.end_date:
            return 'Completed'
        elif date.today() < event.start_date:
            return 'Not Started'
        return 'Ongoing'


@admin.register(EventType)
class EventTypeAdmin(admin.ModelAdmin):
    list_display = ['type']


@admin.register(Participant)
class ParticipantAdmin(admin.ModelAdmin):
    list_display = ['username', 'email']


@admin.register(Enrollment)
class EnrollmentAdmin(admin.ModelAdmin):
    list_display = ['id', 'event', 'participant', 'enrollment_date']
    list_select_related = ['participant', 'event']

    def participant(self, enrollment):
        return enrollment.participant.username

    def event(self, enrollment):
        return enrollment.event.title
