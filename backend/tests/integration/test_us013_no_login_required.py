"""Integration tests for US-013: Use the calculator without logging in.

AC-023: the calculator is fully usable with no prompt to register, log in or
provide personal details. The only backend-level fact available to support
that for this frontend-only story is that the single documented endpoint,
/health, requires no authentication.
"""

from fastapi.testclient import TestClient


def test_tc048_health_requires_no_authentication(client: TestClient) -> None:
    """GET /health succeeds with no Authorization header and no session cookie."""
    assert "Authorization" not in client.headers
    assert not client.cookies

    response = client.get("/health")

    assert response.status_code == 200
    assert response.status_code not in (401, 403)
    assert not (300 <= response.status_code < 400)
    assert response.json() == {"status": "ok"}

    # No account, session, or token was created as a result of the call.
    assert "Authorization" not in client.headers
    assert not client.cookies
