"""Integration tests for US-002: Perform subtraction.

The approved architecture exposes no endpoint that performs or returns a
difference, so these cases only confirm the backend dependency the calculator
relies on is reachable and healthy. The subtraction results themselves
(AC-003, AC-004) are verified separately by e2e cases.
"""

from fastapi.testclient import TestClient


def test_tc020_backend_is_reachable_before_subtraction(client: TestClient) -> None:
    """TC-020: Backend service is reachable before performing a subtraction (AC-003)."""
    response = client.get("/health")

    assert response.status_code == 200
    assert response.json() == {"status": "ok"}


def test_tc023_backend_is_reachable_before_negative_result_subtraction(
    client: TestClient,
) -> None:
    """TC-023: Backend reachable before a subtraction yielding a negative result (AC-004)."""
    response = client.get("/health")

    assert response.status_code == 200
    assert response.json() == {"status": "ok"}
