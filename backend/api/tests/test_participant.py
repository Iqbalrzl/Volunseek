from model_bakery import baker
from api.models import Event, EventDetail
from rest_framework import status
import pytest


@pytest.mark.django_db
class TestParticipant:
    def test_retrieve_participant(self, api_clientJWT):

        response = api_clientJWT.get('/api/participant/me/')

        assert response.status_code == status.HTTP_200_OK

    def test_update_participant(self, api_clientJWT):

        response = api_clientJWT.put('/api/participant/me/', {
            "birth_date": "2002-09-03",
            "address": "bengawan"
        })

        assert response.status_code == status.HTTP_200_OK
