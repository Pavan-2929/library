import React, { useEffect, useState } from "react";
import axios from "axios";

const Home = () => {
  const [data, setData] = useState("");
const backendUrl = import.meta.env.VITE_BACKEND_URL;
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(`${backendUrl}`); // Fetch from backend
        setData(response.data);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, [backendUrl]); // Dependency on backendUrl

  return (
    <div>
      <div>
        <h1>This is Home Page</h1>
        <p>Backend URL: {backendUrl}</p> {/* Display the BACKEND_URL */}
        <p>Fetched Data: {data}</p> {/* Display fetched data */}
      </div>
    </div>
  );
};

export default Home;
