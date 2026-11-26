"""Integration tests for US-008: Enter decimal numbers.

The calculator has no dedicated data endpoint for decimal entry or duplicate
decimal point handling: both AC-014 and AC-015 are exercised on the running
app's calculator screen, not through a backend endpoint. The one check shared
as a precondition for both is that the service is up and reachable.
"""

from fastapi.testclient import TestClient


def test_tc025_service_available_before_decimal_entry_tests(client: TestClient) -> None:
    """The service must be reachable before the calculator screen can be tested
    for decimal point entry (AC-014) and duplicate decimal point handling (AC-015)."""
    response = client.get("/health")

    assert response.status_code == 200
    assert response.json() == {"status": "ok"}
