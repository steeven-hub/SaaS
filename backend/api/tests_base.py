import pytest

@pytest.mark.django_db
def test_user_creation():
    from users.models import User
    user = User.objects.create_user(username="testuser", email="test@example.com")
    assert user.username == "testuser"
    assert user.subscription_status == "inactive"
