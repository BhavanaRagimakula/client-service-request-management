const express = require("express");

const app = express();

app.use(express.json());

let serviceRequests = [
  {
    id: 1,
    title: "Unable to access application",
    description: "User cannot log in to the client portal.",
    priority: "High",
    status: "Open"
  }
];

// Health check
app.get("/", (req, res) => {
  res.json({
    message: "Client Service Request Management API is running"
  });
});

// GET all service requests
app.get("/api/requests", (req, res) => {
  res.json(serviceRequests);
});

// GET one service request
app.get("/api/requests/:id", (req, res) => {
  const id = Number(req.params.id);

  const request = serviceRequests.find(
    (item) => item.id === id
  );

  if (!request) {
    return res.status(404).json({
      message: "Service request not found"
    });
  }

  res.json(request);
});

// CREATE a service request
app.post("/api/requests", (req, res) => {
  const { title, description, priority } = req.body;

  if (!title || !description || !priority) {
    return res.status(400).json({
      message: "Title, description, and priority are required"
    });
  }

  const newRequest = {
    id: serviceRequests.length + 1,
    title,
    description,
    priority,
    status: "Open"
  };

  serviceRequests.push(newRequest);

  res.status(201).json(newRequest);
});

// UPDATE a service request
app.put("/api/requests/:id", (req, res) => {
  const id = Number(req.params.id);

  const request = serviceRequests.find(
    (item) => item.id === id
  );

  if (!request) {
    return res.status(404).json({
      message: "Service request not found"
    });
  }

  const { title, description, priority, status } = req.body;

  request.title = title || request.title;
  request.description = description || request.description;
  request.priority = priority || request.priority;
  request.status = status || request.status;

  res.json(request);
});

// DELETE a service request
app.delete("/api/requests/:id", (req, res) => {
  const id = Number(req.params.id);

  const requestExists = serviceRequests.some(
    (item) => item.id === id
  );

  if (!requestExists) {
    return res.status(404).json({
      message: "Service request not found"
    });
  }

  serviceRequests = serviceRequests.filter(
    (item) => item.id !== id
  );

  res.json({
    message: "Service request deleted successfully"
  });
});

const PORT = 5000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
