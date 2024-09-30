import React, { useState } from "react";
import axios from "axios";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { FaCalendarAlt, FaBook, FaUser } from "react-icons/fa";

const backendUrl = import.meta.env.VITE_BACKEND_URL;

const BooksIssuedInDateRange = () => {
  const [startDate, setStartDate] = useState(null);
  const [endDate, setEndDate] = useState(null);
  const [transactions, setTransactions] = useState([]);
  const [error, setError] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setTransactions([]);

    try {
      const response = await axios.get(
        `${backendUrl}/api/transactions/date-range`,
        {
          params: {
            startDate: startDate.toISOString(),
            endDate: endDate.toISOString(),
          },
        }
      );
      setTransactions(response.data);
    } catch (err) {
      setError(err.response?.data?.message || "Error fetching transactions");
    }
  };

  return (
    <div className="max-w-lg mx-auto bg-white p-8 rounded-lg shadow-lg">
      <h2 className="text-3xl font-bold mb-6 text-center text-green-600">
        Books Issued in Date Range
      </h2>
      <form onSubmit={handleSubmit}>
        <div className="mb-6">
          <label className="block text-gray-700 font-semibold mb-2">
            <FaCalendarAlt className="inline mr-2 text-green-600" />
            Start Date
          </label>
          <DatePicker
            selected={startDate}
            onChange={(date) => setStartDate(date)}
            className="w-full p-3 border border-green-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500 transition duration-200"
            placeholderText="Select start date"
            required
          />
        </div>
        <div className="mb-6">
          <label className="block text-gray-700 font-semibold mb-2">
            <FaCalendarAlt className="inline mr-2 text-green-600" />
            End Date
          </label>
          <DatePicker
            selected={endDate}
            onChange={(date) => setEndDate(date)}
            className="w-full p-3 border border-green-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500 transition duration-200"
            placeholderText="Select end date"
            required
          />
        </div>
        <button
          type="submit"
          className="w-full p-3 bg-green-600 text-white rounded-md hover:bg-green-700 transition duration-200"
        >
          Fetch Issued Books
        </button>
      </form>

      {error && (
        <div className="mt-6 p-4 bg-red-100 text-red-800 rounded-md">
          {error}
        </div>
      )}

      {transactions.length > 0 && (
        <div className="mt-8 bg-green-50 p-6 rounded-lg shadow-md">
          <h3 className="text-xl font-semibold text-green-700 mb-4">
            Issued Books Details
          </h3>
          <ul className="space-y-4">
            {transactions.map((transaction) => (
              <li
                key={transaction._id}
                className="bg-white p-4 rounded-md shadow-sm border border-green-200"
              >
                <div className="text-lg font-semibold text-green-800 flex items-center mb-2">
                  <FaBook className="mr-2" />
                  {transaction.bookId.name}
                </div>
                <div className="text-sm text-gray-600 mb-1">
                  <strong>Category:</strong> {transaction.bookId.category}
                </div>
                <div className="text-sm text-gray-600 mb-1">
                  <FaUser className="inline mr-2 text-green-600" />
                  <strong>Issued to:</strong> {transaction.userId.username} (
                  {transaction.userId.email})
                </div>
                <div className="text-sm text-gray-600">
                  <FaCalendarAlt className="inline mr-2 text-green-600" />
                  <strong>Issue Date:</strong>{" "}
                  {new Date(transaction.issueDate).toLocaleDateString()}
                </div>
                <div className="text-sm text-gray-600">
                  <FaCalendarAlt className="inline mr-2 text-red-500" />
                  <strong>Return Date:</strong>{" "}
                  {new Date(transaction.returnDate).toLocaleDateString()}
                </div>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};

export default BooksIssuedInDateRange;
