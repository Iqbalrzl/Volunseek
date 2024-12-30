from model_bakery import baker
from api.models import Event, EventDetail
from rest_framework import status
import pytest


@pytest.mark.django_db
class TestEventDetail:
    def test_create_event_detail(self, api_client, authenticate):
        authenticate(is_staff=True)
        event = baker.make(Event)

        response = api_client.post(f'/api/event/{event.id}/detail/', {
            "task": "test_task",
            "tools": "test_tools",
            "information": "test_information"
        })

        assert response.status_code == status.HTTP_201_CREATED

    def test_retrieve_event_detail(self, api_client, authenticate):
        authenticate(is_staff=True)
        event = baker.make(Event)

        response = api_client.get(f'/api/event/{event.id}/detail/')

        assert response.status_code == status.HTTP_200_OK

    def test_update_event_detail(self, api_client, authenticate):
        authenticate(is_staff=True)
        event = baker.make(Event)
        detail = baker.make(EventDetail)

        api_client.post(f'/api/event/{event.id}/detail/', {
            "task": str(detail.task),
            "tools": str(detail.tools),
            "information": str(detail.information)
        })
        response = api_client.put(f'/api/event/{event.id}/detail/{event.id}/', {
            "task": "test_task",
            "tools": "test_tools",
            "information": "test_information"
        })

        assert response.status_code == status.HTTP_200_OK
