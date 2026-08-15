 pytest

from request_analytics import validate_request, analyze_requests


def test_validate_request():
    request = {
        "title": "Login issue",
        "description": "Unable to login",
        "priority": "High",
        "status": "Open",
    }

    assert validate_request(request) is True


def test_invalid_request():
    request = {
        "title": "",
        "description": "Missing title",
        "priority": "High",
        "status": "Open",
    }

    assert validate_request(request) is False


def test_analyze_requests():
    requests = [
        {
            "title": "Login issue",
            "description": "Unable to login",
            "priority": "High",
            "status": "Open",
        },
        {
            "title": "Password reset",
            "description": "Reset required",
            "priority": "Medium",
            "status": "Resolved",
        },
    ]

    result = analyze_requests(requests)

    assert result["total_requests"] == 2
    assert result["priority_distribution"]["High"] == 1
    assert result["priority_distribution"]["Medium"] == 1


def test_empty_requests():
    result = analyze_requests([])

    assert result["total_requests"] == 0
    assert result["priority_distribution"] == {}
    assert result["status_distribution"] == {}
