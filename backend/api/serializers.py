from rest_framework import serializers
from .models import *
from datetime import date


class EventTypeSerializer(serializers.ModelSerializer):
    class Meta:
        model = EventType
        fields = ['id', 'type']


class EventImageSerializer(serializers.ModelSerializer):
    class Meta:
        model = EventImage
        fields = ['id', 'image']

    image = serializers.SerializerMethodField(method_name='get_image')

    def create(self, validated_data):
        event_id = self.kwargs['event_pk']
        return EventImage.objects.create(event_id=event_id, **validated_data)

    def get_image(self, image=EventImage):
        request = self.context.get('request')
        if request:
            return request.build_absolute_uri(image.image.url)
        return image.image.url


class EventSerializer(serializers.ModelSerializer):
    class Meta:
        model = Event
        fields = ['id', 'name_event', 'start_event', 'end_event',
                  'location_event', 'event_type', 'imageURL', 'desc', 'max_participants', 'status']

    name_event = serializers.CharField(max_length=255, source='title')
    start_event = serializers.DateField(source='start_date')
    end_event = serializers.DateField(source='end_date')
    location_event = serializers.CharField(max_length=255, source='location')
    event_type = serializers.StringRelatedField()
    #  or serializers.HyperlinkedRelatedField(
    #     queryset=EventType.objects.all(),
    #     view_name='api-event_type-detail')
    imageURL = EventImageSerializer(many=True, read_only=True, source='image')
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


class EnrollmentMeSerializer(serializers.ModelSerializer):
    class Meta:
        model = Enrollment
        fields = ['event']

    event = EventSerializer(read_only=True)


class ParticipantMeSerializer(serializers.ModelSerializer):
    class Meta:
        model = Participant
        fields = ['birth_date', 'address', 'enrollment']

    enrollment = EnrollmentMeSerializer(
        many=True, read_only=True, source='participant')


class EnrollmentSerializer(serializers. ModelSerializer):
    class Meta:
        model = Enrollment
        fields = ['id', 'event', 'participant', 'enrollment_date']

    event = EventSerializer(read_only=True)
    participant = ParticipantSerializer(read_only=True)


class CreateEnrollmentSerializer(serializers.Serializer):
    id = serializers.IntegerField(read_only=True)
    enrollment_date = serializers.DateField(read_only=True)
    event = EventSerializer(read_only=True)
    participant = ParticipantSerializer(read_only=True)

    def create(self, validated_data):
        event_id = self.context['event_id']
        print(self.context['user_id'])
        (participant_id, created) = Participant.objects.values('id').get_or_create(
            user_id=self.context['user_id'])
        return Enrollment.objects.create(event_id=event_id, participant_id=participant_id['id'], **validated_data)
