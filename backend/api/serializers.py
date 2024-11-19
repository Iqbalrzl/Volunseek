from rest_framework import serializers


class EventSerializer(serializers.Serializer):
    id = serializers.IntegerField()
    title = serializers.CharField(max_length=255)
    description = serializers.CharField(
        max_length=None, allow_blank=True, allow_null=True)
    start_date = serializers.DateField()
    end_date = serializers.DateField()
    location = serializers.CharField(max_length=255)
