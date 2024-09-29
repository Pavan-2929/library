import React, { useState } from "react";
import axios from "axios";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
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
      console.log(response);

      setTransactions(response.data);
    } catch (err) {
      setError(err.response?.data?.message || "Error fetching transactions");
    }
  };

  return (
    <div className="max-w-lg mx-auto bg-white p-6 rounded-lg shadow-md">
      <h2 className="text-xl font-bold mb-4 text-center">
        Books Issued in Date Range
      </h2>
      <form onSubmit={handleSubmit}>
        <div className="mb-4">
          <label className="block text-gray-600">Start Date:</label>
          <DatePicker
            selected={startDate}
            onChange={(date) => setStartDate(date)}
            className="w-full p-3 border border-gray-300 rounded"
            placeholderText="Select start date"
            required
          />
        </div>
        <div className="mb-4">
          <label className="block text-gray-600">End Date:</label>
          <DatePicker
            selected={endDate}
            onChange={(date) => setEndDate(date)}
            className="w-full p-3 border border-gray-300 rounded"
            placeholderText="Select end date"
            required
          />
        </div>
        <button
          type="submit"
          className="w-full p-3 bg-blue-600 text-white rounded hover:bg-blue-700 transition duration-200"
        >
          Fetch Issued Books
        </button>
      </form>

      {error && <p className="mt-4 text-red-600">{error}</p>}

      {transactions.length > 0 && (
        <div className="mt-6">
          <h3 className="text-lg font-bold mb-4">Results:</h3>
          <ul className="list-disc pl-5 space-y-2">
            {transactions.map((transaction) => (
              <li key={transaction._id}>
                <strong>Book:</strong> {transaction.bookId.name} <br />
                <strong>Category:</strong> {transaction.bookId.category} <br />
                <strong>Issued to:</strong> {transaction.userId.username} (
                {transaction.userId.email}) <br />
                <strong>Issue Date:</strong>{" "}
                {new Date(transaction.issueDate).toLocaleDateString()} <br />
                <strong>Return Date:</strong>{" "}
                {new Date(transaction.returnDate).toLocaleDateString()}
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};

export default BooksIssuedInDateRange;
