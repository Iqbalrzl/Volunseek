from rest_framework import serializers
from .models import *
from datetime import date


class EventTypeSerializer(serializers.ModelSerializer):
    class Meta:
        model = EventType
        fields = ['id', 'type']


class EventSerializer(serializers.ModelSerializer):
    class Meta:
        model = Event
        fields = ['id', 'name_event', 'start_event', 'end_event',
                  'location_event', 'event_type', 'imageURL', 'desc', 'status']

    name_event = serializers.CharField(max_length=255, source='title')
    start_event = serializers.DateField(source='start_date')
    end_event = serializers.DateField(source='end_date')
    location_event = serializers.CharField(max_length=255, source='location')
    event_type = serializers.StringRelatedField()
    #  or serializers.HyperlinkedRelatedField(
    #     queryset=EventType.objects.all(),
    #     view_name='api-event_type-detail')
    imageURL = serializers.URLField(
        max_length=255, allow_blank=True, allow_null=True, source='image_url')
    desc = serializers.CharField(
        max_length=None, allow_blank=True, allow_null=True, source='description')
    status = serializers.SerializerMethodField(
        method_name='define_status', read_only=True)

    def define_status(self, event=Event):
        if date.today() > event.end_date:
            return 'Completed'
        elif date.today() < event.start_date:
            return 'Not Started'
        return 'Ongoing'


class EventDetailSerializer(serializers.ModelSerializer):
    class Meta:
        model = EventDetail
        fields = ['event_id', 'event', 'task', 'tools', 'information']

    event = EventSerializer(read_only=True)


class NestedEventDetailSerializer(serializers.ModelSerializer):
    class Meta:
        model = EventDetail
        fields = ['task', 'tools', 'information']

    def create(self, validated_data):
        event_id = self.context['event_id']
        return EventDetail.objects.create(event_id=event_id, **validated_data)


class ParticipantSerializer(serializers.ModelSerializer):
    class Meta:
        model = Participant
        fields = ['id', 'user', 'user_id', 'birth_date', 'address']

    user_id = serializers.IntegerField(read_only=True)
    user = serializers.StringRelatedField(read_only=True)


class EnrollmentSerializer(serializers. ModelSerializer):
    class Meta:
        model = Enrollment
        fields = ['id', 'event', 'participant', 'enrollment_date']

    event = EventSerializer(read_only=True)
    participant = ParticipantSerializer(read_only=True)
