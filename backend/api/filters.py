from django_filters.rest_framework import FilterSet
from .models import *


class EventFilter(FilterSet):
    class Meta:
        model = Event
        fields = {
            'event_type_id': ['exact'],
            'max_participants': ['gt', 'lt']
        }
