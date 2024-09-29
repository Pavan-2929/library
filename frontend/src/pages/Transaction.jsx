import React, { useState } from "react";
import axios from "axios";
import { useSelector } from "react-redux";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { addDays } from "date-fns";
import { FaCalendarAlt } from "react-icons/fa";

const TransactionForm = ({ bookId, closeModal, dailyRent }) => {
  const currentUser = useSelector((state) => state.auth.currentUser);

  const [userId] = useState(currentUser._id);
  const [issueDate, setIssueDate] = useState(null);
  const [returnDate, setReturnDate] = useState(null);
  const [message, setMessage] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage("");

    try {
      const response = await axios.post(
        "http://localhost:3000/api/transaction",
        {
          bookId,
          userId,
          issueDate,
          returnDate,
          dailyRent: parseFloat(dailyRent),
        }
      );

      setMessage(response.data.message);
    } catch (error) {
      setMessage(
        error.response
          ? error.response.data.message
          : "Error creating transaction"
      );
    }
  };

  return (
    <div className="bg-white p-6 shadow-lg rounded-lg max-w-md mx-auto">
      <h2 className="text-2xl font-bold mb-6 text-center text-gray-800">
        Create Transaction
      </h2>
      <form onSubmit={handleSubmit}>
        <div className="mb-5">
          <label className="block mb-2 text-gray-600">User ID:</label>
          <input
            type="text"
            value={userId}
            disabled
            className="w-full p-3 border border-gray-300 rounded bg-zinc-100"
            required
          />
        </div>
        <div className="mb-5 relative ">
          <label className="block mb-2 text-gray-600">Issue Date:</label>
          <div className="flex items-center relative">
            <DatePicker
              selected={issueDate}
              onChange={(date) => setIssueDate(date)}
              className="w-full p-3 border  border-gray-300 rounded pl-10 pr-32 cursor-pointer"
              minDate={new Date()}
              placeholderText="Select issue date"
              required
            />
            <FaCalendarAlt className="absolute left-3 text-gray-500" />
          </div>
        </div>
        <div className="mb-5 relative">
          <label className="block mb-2 text-gray-600">Return Date:</label>
          <div className="flex items-center relative">
            <DatePicker
              selected={returnDate}
              onChange={(date) => setReturnDate(date)}
              className="w-full p-3 border border-gray-300 rounded pl-10 pr-32 cursor-pointer"
              minDate={addDays(issueDate || new Date(), 1)}
              placeholderText="Select return date"
              required
            />
            <FaCalendarAlt className="absolute left-3 text-gray-500" />
          </div>
        </div>
        <div className="flex items-center justify-between gap-x-10">
          <button
            type="submit"
            className="w-full p-3 bg-blue-600 text-white rounded hover:bg-blue-700 transition duration-200"
          >
            Create Transaction
          </button>
          <button
            onClick={closeModal}
            className=" w-full p-3 bg-red-500 hover:bg-red-700 text-white rounded-md transition duration-200"
          >
            Close
          </button>
        </div>
      </form>
      {message && <p className="mt-5 text-green-600">{message}</p>}
    </div>
  );
};

export default TransactionForm;
