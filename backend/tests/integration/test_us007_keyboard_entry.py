"""Integration tests for US-007: Enter numbers and operations with the keyboard."""

from fastapi.testclient import TestClient


def test_tc036_backend_health_check_before_keyboard_entry(client: TestClient) -> None:
    """The calculator depends on the serving layer being healthy before it can
    accept keyboard input, so this confirms GET /health reports a healthy
    status without creating or changing any calculator data."""
    response = client.get("/health")

    assert response.status_code == 200
    assert response.json() == {"status": "ok"}
