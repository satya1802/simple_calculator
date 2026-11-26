"""Integration tests for US-004: Perform division.

The approved architecture exposes no endpoint that performs or returns a
quotient, so these cases only confirm the backend dependency the calculator
relies on is reachable and healthy. The quotients themselves (AC-007, AC-008)
are verified separately by e2e cases.
"""

from fastapi.testclient import TestClient


def test_tc042_backend_is_reachable_before_whole_number_division(client: TestClient) -> None:
    """TC-042: Backend reachable before a whole-number division is performed (AC-007)."""
    response = client.get("/health")

    assert response.status_code == 200
    assert response.json() == {"status": "ok"}


def test_tc046_backend_is_reachable_before_decimal_producing_division(
    client: TestClient,
) -> None:
    """TC-046: Backend reachable before a decimal-producing division is performed (AC-008)."""
    response = client.get("/health")

    assert response.status_code == 200
    assert response.json() == {"status": "ok"}
