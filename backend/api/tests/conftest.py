import pytest
import jwt
from users.models import User
from api.models import Participant
from unittest.mock import patch
from rest_framework.test import APIClient


@pytest.fixture
def api_client():
    return APIClient()


@pytest.fixture
def authenticate(api_client):
    def do_authenticate(is_staff=False):
        return api_client.force_authenticate(user=User(is_staff=is_staff))
    return do_authenticate


@pytest.fixture
def test_user(db):
    user = User.objects.create_user(
        username="testuser", password="testpassword", email="test@gmail.com")
    return user


@pytest.fixture
def test_participant(test_user):
    participant = Participant.objects.values('id').get_or_create(
        user_id=test_user.id)
    return participant


@pytest.fixture
def jwt_token(test_user):
    from rest_framework_simplejwt.tokens import RefreshToken
    refresh = RefreshToken.for_user(test_user)
    return str(refresh.access_token)


@pytest.fixture
def api_clientJWT(jwt_token, test_participant):
    client = APIClient()
    client.credentials(HTTP_AUTHORIZATION=f"JWT {jwt_token}")
    participant = test_participant
    return client
