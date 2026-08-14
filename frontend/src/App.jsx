import { useEffect, useState } from "react";

const API_URL = "http://localhost:5000/api/requests";

function App() {
  const [requests, setRequests] = useState([]);
  const [form, setForm] = useState({
    title: "",
    description: "",
    priority: "Medium"
  });

  const loadRequests = async () => {
    try {
      const response = await fetch(API_URL);
      const data = await response.json();
      setRequests(data);
    } catch (error) {
      console.error("Error loading requests:", error);
    }
  };
