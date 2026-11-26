"""Integration tests for US-009: Clear or reset the calculator.

AC-016 describes a purely client-side behavior (the display resets when the
user activates the clear/reset control). There is no calculator-specific
backend endpoint or state to exercise for this story, so the only backend
check available is that the serving layer is up, which TC-009 performs.
"""

from fastapi.testclient import TestClient


def test_tc009_serving_layer_is_available_to_support_the_calculator_app(
    client: TestClient,
) -> None:
    """Confirms the backend health endpoint responds normally.

    This is a supporting check only: clear/reset is entirely client-side, so
    this case cannot verify the AC-016 display-reset behavior itself. That
    requirement is verified by the e2e cases.
    """
    response = client.get("/health")

    assert response.status_code == 200
    assert response.json() == {"status": "ok"}
