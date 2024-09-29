import React, { useState } from "react";
import axios from "axios";

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
      <h2 className="text-2xl font-bold mb-4 text-center">
        Books Issued to User
      </h2>
      <form onSubmit={handleSubmit} className="mb-4">
        <div className="mb-4">
          <label className="block mb-2 text-gray-700">User ID</label>
          <input
            type="text"
            value={userId}
            onChange={(e) => setUserId(e.target.value)}
            placeholder="Enter User ID"
            className="w-full p-3 border rounded-md"
            required
          />
        </div>
        <button
          type="submit"
          className="w-full p-3 bg-blue-600 text-white rounded-md hover:bg-blue-700"
        >
          Get Issued Books
        </button>
      </form>

      {issuedBooks.length > 0 && (
        <div className="mt-4">
          <h3 className="text-lg font-semibold mb-2">Issued Books:</h3>
          <ul className="list-disc pl-5">
            {issuedBooks.map((book, index) => (
              <li key={index} className="mb-2">
                <strong>Book Name:</strong> {book.bookName} <br />
                <strong>Category:</strong> {book.category} <br />
                <strong>Issue Date:</strong>{" "}
                {new Date(book.issueDate).toLocaleDateString()} <br />
                <strong>Return Date:</strong>{" "}
                {new Date(book.returnDate).toLocaleDateString()}
              </li>
            ))}
          </ul>
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

export default BooksIssued;
