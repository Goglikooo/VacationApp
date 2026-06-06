import { useState, useEffect } from "react";
import { getAll } from "./api/vacationRequests";
import "./App.css";

function App() {
  const [requests, setRequests] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await getAll();
        setRequests(response.data);
        console.log(response.data);
      } catch (error) {
        console.log("Error connecting to backend", error);
      }
    };

    fetchData();
  }, []);

  return (
    <div>
      <h1>TEST</h1>
      <p>Goga Gogeshvili</p>
      <ul>
        {requests.map((item) => (
          <li key={item.id}>{item.startDate}</li>
        ))}
      </ul>
    </div>
  );
}

export default App;
