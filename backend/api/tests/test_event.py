from django.contrib.auth.models import User
from api.models import Event
from rest_framework.test import APIClient
from rest_framework import status
from model_bakery import baker
import pytest


@pytest.mark.django_db
class TestEvent:
    def test_create_event(self, api_client, authenticate):
        authenticate(is_staff=True)

        response = api_client.post('/api/event/', {
            "name_event": "test_event",
            "start_event": "2024-12-31",
            "end_event": "2025-01-01",
            "location_event": "test_location",
            "desc": "test_description",
            "max_participants": 20
        })

        assert response.status_code == status.HTTP_201_CREATED

    def test_retrieve_event(self, api_client, authenticate):
        authenticate(is_staff=True)
        event = baker.make(Event)

        response = api_client.get(f'/api/event/{event.id}/')

        assert response.status_code == status.HTTP_200_OK

    def test_update_event(self, api_client, authenticate):
        authenticate(is_staff=True)
        event = baker.make(Event)

        response = api_client.put(f'/api/event/{event.id}/', {
            "name_event": "updated_event",
            "start_event": "2024-12-31",
            "end_event": "2025-01-01",
            "location_event": "test_location",
            "desc": "test_description",
            "max_participants": 20
        })

        assert response.status_code == status.HTTP_200_OK

    def test_delete_event(self, api_client, authenticate):
        authenticate(is_staff=True)
        event = baker.make(Event)

        response = api_client.delete(f'/api/event/{event.id}/')

        assert response.status_code == status.HTTP_204_NO_CONTENT
