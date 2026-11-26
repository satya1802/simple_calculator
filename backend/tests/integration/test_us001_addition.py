"""Integration tests for US-001: Perform addition.

The approved architecture exposes no endpoint that performs or returns a sum,
so these cases only confirm the backend dependency the calculator relies on
is reachable and healthy. The sums themselves (AC-001, AC-002) are verified
separately by e2e cases.
"""

from fastapi.testclient import TestClient


def test_tc014_backend_is_reachable_before_addition(client: TestClient) -> None:
    """TC-014: Backend service is reachable before performing addition (AC-001)."""
    response = client.get("/health")

    assert response.status_code == 200
    assert response.json() == {"status": "ok"}


def test_tc017_backend_is_reachable_before_decimal_addition(client: TestClient) -> None:
    """TC-017: Backend service is reachable before performing decimal addition (AC-002)."""
    response = client.get("/health")

    assert response.status_code == 200
    assert response.json() == {"status": "ok"}
