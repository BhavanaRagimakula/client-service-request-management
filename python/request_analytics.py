"""Validate required service request fields."""
    required_fields = ["title", "description", "priority", "status"]

    for field in required_fields:
        if not request.get(field):
            return False

    return True


def analyze_requests(requests):
    """Generate basic analytics for service requests."""

    valid_requests = [
        request for request in requests
        if validate_request(request)
    ]

    priority_counts = Counter(
        request["priority"] for request in valid_requests
    )

    status_counts = Counter(
        request["status"] for request in valid_requests
    )

    return {
        "total_requests": len(valid_requests),
        "priority_distribution": dict(priority_counts),
        "status_distribution": dict(status_counts),
    }


if __name__ == "__main__":
    sample_requests = [
        {
            "title": "Login issue",
            "description": "Unable to access account",
            "priority": "High",
            "status": "Open",
        },
        {
            "title": "Password reset",
            "description": "Password reset required",
            "priority": "Medium",
            "status": "Resolved",
        },
    ]

    analytics = analyze_requests(sample_requests)

    print("Service Request Analytics")
    print("-------------------------")
    print(f"Total Requests: {analytics['total_requests']}")
    print(f"Priority Distribution: {analytics['priority_distribution']}")
    print(f"Status Distribution: {analytics['status_distribution']}")
