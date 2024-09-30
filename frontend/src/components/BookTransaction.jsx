import React, { useState } from "react";
import axios from "axios";
import { FaBook, FaUser, FaCalendarAlt } from "react-icons/fa";

const backendUrl = import.meta.env.VITE_BACKEND_URL;

const BookTransactions = () => {
  const [bookName, setBookName] = useState("");
  const [transactions, setTransactions] = useState(null);
  const [error, setError] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setTransactions(null);

    try {
      const response = await axios.get(`${backendUrl}/api/transactions/get`, {
        params: { bookName },
      });
      setTransactions(response.data);
    } catch (err) {
      setError(err.response?.data?.message || "Error fetching transactions");
    }
  };

  return (
    <div className="max-w-lg mx-auto bg-white p-8 rounded-lg shadow-lg">
      <h2 className="text-3xl font-bold mb-6 text-center text-green-600">
        Book Transactions
      </h2>
      <form onSubmit={handleSubmit}>
        <div className="mb-6">
          <label className="block text-gray-700 font-semibold mb-2">
            <FaBook className="inline mr-2 text-green-600" />
            Book Name
          </label>
          <input
            type="text"
            value={bookName}
            onChange={(e) => setBookName(e.target.value)}
            className="w-full p-3 border border-green-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500 transition duration-200"
            placeholder="Enter book name"
            required
          />
        </div>
        <button
          type="submit"
          className="w-full p-3 bg-green-600 text-white rounded-md hover:bg-green-700 transition duration-200"
        >
          Fetch Transactions
        </button>
      </form>

      {error && (
        <div className="mt-6 p-4 bg-red-100 text-red-800 rounded-md">
          {error}
        </div>
      )}

      {transactions && (
        <div className="mt-8 bg-green-50 p-6 rounded-lg shadow-md">
          <h3 className="text-xl font-semibold text-green-700 mb-4">
            Results for "{bookName}":
          </h3>
          <p className="text-gray-700">
            <strong>Total Issued Count:</strong> {transactions.totalIssuedCount}
          </p>
          <p className="text-gray-700">
            <strong>Currently Issued Status:</strong>{" "}
            {transactions.currentlyIssued ? "Yes" : "No"}
          </p>

          <h4 className="mt-6 font-semibold text-green-600">
            Previously Issued By:
          </h4>
          {transactions.allPreviousIssued.length > 0 ? (
            <ul className="list-disc pl-5 space-y-4">
              {transactions.allPreviousIssued.map((transaction, index) => (
                <li
                  key={index}
                  className="bg-white p-4 rounded-md shadow-sm border border-green-200"
                >
                  <div className="text-lg font-semibold text-green-800 mb-2">
                    <FaUser className="inline mr-2" />
                    {transaction.username}
                  </div>
                  <div className="text-sm text-gray-600 mb-1">
                    <strong>Email:</strong> {transaction.email}
                  </div>
                  <div className="text-sm text-gray-600">
                    <FaCalendarAlt className="inline mr-2 text-green-600" />
                    <strong>Issue Date:</strong>{" "}
                    {new Date(transaction.issueDate).toLocaleDateString()}
                  </div>
                  <div className="text-sm text-gray-600">
                    <FaCalendarAlt className="inline mr-2 text-red-500" />
                    <strong>Return Date:</strong>{" "}
                    {transaction.returnDate
                      ? new Date(transaction.returnDate).toLocaleDateString()
                      : "Not returned yet"}
                  </div>
                </li>
              ))}
            </ul>
          ) : (
            <p className="mt-4 text-gray-600">
              No previous transactions found for this book.
            </p>
          )}
        </div>
      )}
    </div>
  );
};

export default BookTransactions;
