import React, { useState } from "react";
import axios from "axios";
import { FaMoneyBillWave, FaBook } from "react-icons/fa";

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
    <div className="max-w-md mx-auto p-8 bg-white shadow-lg rounded-lg">
      <h2 className="text-3xl font-bold mb-6 text-center text-green-600">
        Total Rent Generated
      </h2>
      <form onSubmit={handleSubmit} className="mb-6">
        <div className="mb-6">
          <label className="block text-gray-700 font-semibold mb-2">
            <FaBook className="inline mr-2 text-green-600" />
            Book Name
          </label>
          <input
            type="text"
            value={bookName}
            onChange={(e) => setBookName(e.target.value)}
            placeholder="Enter book name"
            className="w-full p-3 border border-green-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500 transition duration-200"
            required
          />
        </div>
        <button
          type="submit"
          className="w-full p-3 bg-green-600 text-white rounded-md hover:bg-green-700 transition duration-200"
        >
          Get Total Rent
        </button>
      </form>

      {totalRent !== null && (
        <div className="mt-6 p-4 bg-green-100 text-green-800 rounded-md flex items-center">
          <FaMoneyBillWave className="mr-2 text-green-700" />
          <p>Total Rent Generated: ₹{totalRent}</p>
        </div>
      )}

      {error && (
        <div className="mt-6 p-4 bg-red-100 text-red-800 rounded-md">
          <p>{error}</p>
        </div>
      )}
    </div>
  );
};

export default TotalRentGenerated;
