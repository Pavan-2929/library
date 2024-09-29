import React, { useState } from "react";
import axios from "axios";
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
      const response = await axios.get(
        `${backendUrl}/api/transactions/get`,
        {
          params: { bookName },
        }
      );

      setTransactions(response.data);
    } catch (err) {
      setError(err.response?.data?.message || "Error fetching transactions");
    }
  };

  return (
    <div className="max-w-lg mx-auto bg-white p-6 rounded-lg shadow-md">
      <h2 className="text-xl font-bold mb-4 text-center">Book Transactions</h2>
      <form onSubmit={handleSubmit}>
        <div className="mb-4">
          <label className="block text-gray-600">Book Name:</label>
          <input
            type="text"
            value={bookName}
            onChange={(e) => setBookName(e.target.value)}
            className="w-full p-3 border border-gray-300 rounded"
            placeholder="Enter book name"
            required
          />
        </div>
        <button
          type="submit"
          className="w-full p-3 bg-blue-600 text-white rounded hover:bg-blue-700 transition duration-200"
        >
          Fetch Transactions
        </button>
      </form>

      {error && <p className="mt-4 text-red-600">{error}</p>}

      {transactions && (
        <div className="mt-6">
          <h3 className="text-lg font-bold mb-4">Results for "{bookName}":</h3>
          <p>
            <strong>Total Issued Count:</strong> {transactions.totalIssuedCount}
          </p>
          <p>
            <strong>Currently Issued Status:</strong>{" "}
            {transactions.currentlyIssued}
          </p>

          <h4 className="mt-4 font-semibold">Previously Issued By:</h4>
          {transactions.allPreviousIssued.length > 0 ? (
            <ul className="list-disc pl-5 space-y-2">
              {transactions.allPreviousIssued.map((transaction, index) => (
                <li key={index}>
                  <strong>Username:</strong> {transaction.username} <br />
                  <strong>Email:</strong> {transaction.email} <br />
                  <strong>Issue Date:</strong>{" "}
                  {new Date(transaction.issueDate).toLocaleDateString()} <br />
                  <strong>Return Date:</strong>{" "}
                  {transaction.returnDate
                    ? new Date(transaction.returnDate).toLocaleDateString()
                    : "Not returned yet"}
                </li>
              ))}
            </ul>
          ) : (
            <p>No previous transactions found for this book.</p>
          )}
        </div>
      )}
    </div>
  );
};

export default BookTransactions;
