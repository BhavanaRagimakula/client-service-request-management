const express = require("express");
const cors = require("cors");

const app = express();
const PORT = 5000;

app.use(cors());
app.use(express.json());

let requests = [
  {
    id: 1,
    title: "Login issue",
    description: "Client cannot access the application",
    priority: "High",
    status: "Open"
  },
  {
    id: 2,
    title: "Password reset",
    description: "Client requested a password reset",
    priority: "Medium",
    status: "Resolved"
  }
];

// GET - Retrieve all service requests
app.get("/api/requests", (req, res) => {
  res.json(requests);
});

// GET - Retrieve one service request
app.get("/api/requests/:id", (req, res) => {
  const id = Number(req.params.id);
  const request = requests.find((item) => item.id === id);

  if (!request) {
    return res.status(404).json({
      error: "Service request not found"
    });
  }

  res.json(request);
});

// POST - Create a service request
app.post("/api/requests", (req, res) => {
  const { title, description, priority } = req.body;

  if (!title || !description || !priority) {
    return res.status(400).json({
      error: "Title, description, and priority are required"
    });
  }

  const newRequest = {
    id: requests.length + 1,
    title,
    description,
    priority,
    status: "Open"
  };

  requests.push(newRequest);

  res.status(201).json(newRequest);
});

// PUT - Update a service request
app.put("/api/requests/:id", (req, res) => {
  const id = Number(req.params.id);
  const request = requests.find((item) => item.id === id);

  if (!request) {
    return res.status(404).json({
      error: "Service request not found"
    });
  }

  const { title, description, priority, status } = req.body;

  if (title) request.title = title;
  if (description) request.description = description;
  if (priority) request.priority = priority;
  if (status) request.status = status;

  res.json(request);
});

// DELETE - Delete a service request
app.delete("/api/requests/:id", (req, res) => {
  const id = Number(req.params.id);
  const requestExists = requests.some((item) => item.id === id);

  if (!requestExists) {
    return res.status(404).json({
      error: "Service request not found"
    });
  }

  requests = requests.filter((item) => item.id !== id);

  res.json({
    message: "Service request deleted successfully"
  });
});

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
