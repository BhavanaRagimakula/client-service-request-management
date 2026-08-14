import { useEffect, useState } from "react";

function App() {
  const [requests, setRequests] = useState([]);

  useEffect(() => {
    fetch("http://localhost:5000/api/requests")
      .then((response) => response.json())
      .then((data) => setRequests(data))
      .catch((error) => console.error("Error loading requests:", error));
  }, []);

  return (
    <div className="app">
      <header>
        <h1>Client Service Request Management</h1>
        <p>Manage and track client service requests</p>
      </header>

      <main>
        <h2>Service Requests</h2>

        {requests.map((request) => (
          <div className="request-card" key={request.id}>
            <h3>{request.title}</h3>
            <p>{request.description}</p>
            <p>
              <strong>Priority:</strong> {request.priority}
            </p>
            <p>
              <strong>Status:</strong> {request.status}
            </p>
          </div>
        ))}
      </main>
    </div>
  );
}

export default App;
