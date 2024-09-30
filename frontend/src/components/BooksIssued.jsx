import React, { useState } from "react";
import axios from "axios";
import { FaBook, FaCalendarAlt, FaCheckCircle } from "react-icons/fa";

const backendUrl = import.meta.env.VITE_BACKEND_URL;

const BooksIssued = () => {
  const [userId, setUserId] = useState("");
  const [issuedBooks, setIssuedBooks] = useState([]);
  const [error, setError] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setIssuedBooks([]);

    try {
      const response = await axios.get(
        `${backendUrl}/api/issued-books/${userId}`
      );
      setIssuedBooks(response.data.issuedBooks);
    } catch (error) {
      setError(error.response?.data?.message || "Error fetching data");
    }
  };

  return (
    <div className="max-w-md mx-auto p-6 bg-white shadow-md rounded-md">
      <h2 className="text-3xl font-bold mb-6 text-center text-green-600">
        Issued Books Lookup
      </h2>
      <form onSubmit={handleSubmit} className="mb-6">
        <div className="mb-4">
          <label className="block text-lg font-medium text-gray-700 mb-2">
            Enter User ID
          </label>
          <input
            type="text"
            value={userId}
            onChange={(e) => setUserId(e.target.value)}
            placeholder="Type User ID here"
            className="w-full p-3 border border-green-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500 transition duration-200"
            required
          />
        </div>
        <button
          type="submit"
          className="w-full p-3 bg-green-600 text-white rounded-md hover:bg-green-700 transition duration-200"
        >
          Search Issued Books
        </button>
      </form>

      {issuedBooks.length > 0 && (
        <div className="mt-6 bg-green-50 p-4 rounded-lg shadow-sm">
          <h3 className="text-xl font-semibold text-green-700 mb-4">
            <FaCheckCircle className="inline mr-2" />
            Issued Books Details
          </h3>
          <ul className="space-y-4">
            {issuedBooks.map((book, index) => (
              <li key={index} className="bg-white p-4 rounded-lg shadow-md">
                <div className="text-lg font-semibold text-green-800 flex items-center mb-2">
                  <FaBook className="mr-2" />
                  {book.bookName}
                </div>
                <div className="text-sm text-gray-600 mb-1">
                  <strong>Category:</strong> {book.category}
                </div>
                <div className="text-sm text-gray-600">
                  <FaCalendarAlt className="inline mr-2 text-green-600" />
                  <strong>Issue Date:</strong>{" "}
                  {new Date(book.issueDate).toLocaleDateString()}
                </div>
                <div className="text-sm text-gray-600">
                  <FaCalendarAlt className="inline mr-2 text-red-500" />
                  <strong>Return Date:</strong>{" "}
                  {new Date(book.returnDate).toLocaleDateString()}
                </div>
              </li>
            ))}
          </ul>
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

export default BooksIssued;
