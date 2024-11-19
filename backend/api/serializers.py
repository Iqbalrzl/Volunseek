from rest_framework import serializers


class EventSerializer(serializers.Serializer):
    id = serializers.IntegerField()
    name_event = serializers.CharField(max_length=255, source='title')
    start_event = serializers.DateField(source='start_date')
    end_event = serializers.DateField(source='end_date')
    location_event = serializers.CharField(max_length=255, source='location')
    event_type = serializers.StringRelatedField()
    imageURL = serializers.URLField(
        max_length=255, allow_blank=True, allow_null=True, source='image_url')
    desc = serializers.CharField(
        max_length=None, allow_blank=True, allow_null=True, source='description')