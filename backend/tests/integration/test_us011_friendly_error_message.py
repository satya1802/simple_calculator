"""Integration tests for US-011: See a friendly message on other invalid operations.

AC-019 describes client-side behavior (the calculator stays usable and shows a
friendly message on an invalid or incomplete operation). This story's endpoints
list is empty: the calculator has no server-side logic for this feature, so the
only reviewed integration case (TC-055) is a baseline health smoke check. The
actual invalid-operation behavior is confirmed by the e2e cases, not here.
"""

from fastapi.testclient import TestClient


def test_tc055_backend_health_endpoint_responds_normally(client: TestClient) -> None:
    response = client.get("/health")

    assert response.status_code == 200
