from model_bakery import baker
from api.models import Event, Participant
from django.contrib.auth.models import User
from rest_framework import status
import pytest


@pytest.mark.django_db
class TestEnrollment:

    def test_create_enrollment(self, api_clientJWT):
        event = baker.make(Event, max_participants=20)

        response = api_clientJWT.post(
            f'/api/event/{event.id}/enrollment/', data={})

        assert response.status_code == status.HTTP_201_CREATED

    def test_retrieve_enrollment(self, api_client, authenticate):
        authenticate()
        event = baker.make(Event)

        response = api_client.get(f'/api/event/{event.id}/enrollment/')

        assert response.status_code == status.HTTP_200_OK
