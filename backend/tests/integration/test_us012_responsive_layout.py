"""US-012: Use the calculator on desktop and mobile.

These integration test cases are backend-only preconditions for the
front-end layout behaviour described by AC-020, AC-021 and AC-022. They
confirm the backend is reachable and stays reachable across a session;
they do not and cannot verify layout, sizing or the absence of full-page
reloads, which are checked at the E2E level.
"""

import time

from fastapi.testclient import TestClient


def test_tc073_backend_health_check_before_desktop_page_load(client: TestClient) -> None:
    """Precondition for AC-020: the backend must be reachable before the
    calculator page can be served to a desktop browser."""
    response = client.get("/health")

    assert response.status_code == 200
    assert response.json() == {"status": "ok"}


def test_tc075_backend_health_check_before_mobile_page_load(client: TestClient) -> None:
    """Precondition for AC-021: the backend must be reachable before the
    calculator page can be served to a mobile browser."""
    response = client.get("/health")

    assert response.status_code == 200
    assert response.json() == {"status": "ok"}


def test_tc078_backend_remains_available_across_a_calculator_session(
    client: TestClient,
) -> None:
    """Precondition for AC-022: the backend stays healthy across a session of
    calculator use, with no sign that a fresh server-side session is needed
    in between. The absence of full-page reloads is verified at E2E level."""
    first = client.get("/health")
    assert first.status_code == 200
    assert first.json() == {"status": "ok"}

    time.sleep(5)

    second = client.get("/health")
    assert second.status_code == 200
    assert second.json() == {"status": "ok"}
