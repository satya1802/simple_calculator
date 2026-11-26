"""US-005: See the result immediately.

TC-002 confirms the serving layer that hosts the calculator app is available,
by calling GET /health and expecting a 200 OK response.
"""

from fastapi.testclient import TestClient


def test_tc002_health_check_confirms_the_serving_layer_is_available(client: TestClient) -> None:
    response = client.get("/health")

    assert response.status_code == 200
