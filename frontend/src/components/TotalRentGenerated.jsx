import React, { useState } from "react";
import axios from "axios";

const TotalRentGenerated = () => {
  const [bookName, setBookName] = useState("");
  const [totalRent, setTotalRent] = useState(null);
  const [error, setError] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setTotalRent(null);

    try {
      const response = await axios.get(
        `http://localhost:3000/api/rent-generated`,
        { params: { bookName } }
      );
      setTotalRent(response.data.totalRentGenerated);
    } catch (error) {
      setError(error.response?.data?.message || "Error fetching data");
    }
  };

  return (
    <div className="max-w-md mx-auto p-6 bg-white shadow-md rounded-md">
      <h2 className="text-2xl font-bold mb-4 text-center">
        Total Rent Generated
      </h2>
      <form onSubmit={handleSubmit} className="mb-4">
        <div className="mb-4">
          <label className="block mb-2 text-gray-700">Book Name</label>
          <input
            type="text"
            value={bookName}
            onChange={(e) => setBookName(e.target.value)}
            placeholder="Enter book name"
            className="w-full p-3 border rounded-md"
            required
          />
        </div>
        <button
          type="submit"
          className="w-full p-3 bg-blue-600 text-white rounded-md hover:bg-blue-700"
        >
          Get Total Rent
        </button>
      </form>

      {totalRent !== null && (
        <div className="mt-4 p-3 bg-green-100 text-green-800 rounded-md">
          <p>Total Rent Generated: ₹{totalRent}</p>
        </div>
      )}

      {error && (
        <div className="mt-4 p-3 bg-red-100 text-red-800 rounded-md">
          <p>{error}</p>
        </div>
      )}
    </div>
  );
};

export default TotalRentGenerated;
