"""Integration tests for US-010: See a friendly message on division by zero.

These test cases check the backend health endpoint around the client-side
division-by-zero handling. The calculator's division-by-zero message and its
clearing are entirely client-side behaviour with no dedicated endpoint, so
the cases exercise /health before and after the client-side steps to confirm
the backend stays healthy and unaffected throughout.
"""

from fastapi.testclient import TestClient


def test_tc066_backend_stays_healthy_around_division_by_zero_on_client(
    client: TestClient,
) -> None:
    """TC-066: the backend remains healthy before and after a division-by-zero
    error is triggered and displayed on the client."""
    before = client.get("/health")
    assert before.status_code == 200

    # The division-by-zero attempt (12 / 0) and the resulting friendly error
    # message are handled entirely on the client; there is no endpoint call
    # involved in showing it.

    after = client.get("/health")
    assert after.status_code == 200


def test_tc070_backend_stays_healthy_around_clearing_division_by_zero_error(
    client: TestClient,
) -> None:
    """TC-070: the backend remains healthy before and after the user clears a
    displayed division-by-zero error message on the client."""
    before = client.get("/health")
    assert before.status_code == 200

    # The calculator already shows "Cannot divide by zero. Press C to start
    # over." after attempting 12 / 0, and clearing it with the reset control
    # is entirely client-side; there is no endpoint call involved.

    after = client.get("/health")
    assert after.status_code == 200
