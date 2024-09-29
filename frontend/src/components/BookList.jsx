import axios from "axios";
import React, { useState, useEffect } from "react";
import { FaBook, FaRupeeSign, FaLayerGroup } from "react-icons/fa";
import Slider from "rc-slider";
import "rc-slider/assets/index.css";
import Select from "react-select";
import TransactionForm from "../pages/Transaction";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";

const BookList = () => {
  const [books, setBooks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [priceRange, setPriceRange] = useState([20, 100]);
  const [categories, setCategories] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [selectedBook, setSelectedBook] = useState(null);
  const isLoggedIn = useSelector((state) => state.auth.isLoggedIn);

  useEffect(() => {
    axios
      .get("http://localhost:3000/api/book/get")
      .then((response) => {
        setBooks(response.data);
        setLoading(false);
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
        setLoading(false);
      });
  }, []);

  useEffect(() => {
    const uniqueCategories = [
      ...new Set(books.map((book) => book.category)),
    ].map((category) => ({
      value: category,
      label: category,
    }));

    setCategories(uniqueCategories);
  }, [books]);

  const filteredBooks = books.filter((book) => {
    const bookMatchName = book.name
      .toLowerCase()
      .includes(searchTerm.toLowerCase());

    const isWithinPriceRange =
      book.rentPerDay >= priceRange[0] && book.rentPerDay <= priceRange[1];

    const matchesCategory =
      !selectedCategory || book.category === selectedCategory.value;

    return bookMatchName && isWithinPriceRange && matchesCategory;
  });

  const openModal = (book) => {
    setSelectedBook(book);
    setShowModal(true);
  };

  const closeModal = () => {
    setShowModal(false);
    setSelectedBook(null);
  };

  if (loading) {
    return <div className="text-center text-xl font-semibold">Loading...</div>;
  }

  return (
    <div className="max-w-7xl mx-auto w-full h-full md:px-8 sm:px-6 px-3 py-12">
      <h1 className="text-3xl font-bold text-center mb-8">Book List</h1>
      <div className="flex items-center justify-between mb-12">
        <div className="">
          <input
            type="text"
            placeholder="Search for a book..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="bg-gray-100 border border-green-300 rounded-lg py-2 px-4 w-[20rem] focus:outline-none focus:ring-2 focus:ring-green-500 transition duration-200"
          />
        </div>

        <div className="w-1/4">
          <h2 className="text-lg font-semibold text-green-600 mb-2">
            Price Range: ₹{priceRange[0]} - ₹{priceRange[1]}
          </h2>
          <Slider
            range
            min={20}
            max={100}
            value={priceRange}
            onChange={(range) => setPriceRange(range)}
            railStyle={{ backgroundColor: "#e2e8f0" }}
            trackStyle={[{ backgroundColor: "#48bb78" }]}
            handleStyle={[
              { backgroundColor: "#fff", border: "2px solid #48bb78" },
              { backgroundColor: "#fff", border: "2px solid #48bb78" },
            ]}
          />
        </div>

        <div className="w-1/4">
          <Select
            options={categories}
            value={selectedCategory}
            onChange={setSelectedCategory}
            placeholder="Select a category..."
            isClearable
            styles={{
              control: (provided) => ({
                ...provided,
                borderColor: "green",
                boxShadow: "none",
                "&:hover": { borderColor: "#48bb78" },
              }),
              option: (provided, state) => ({
                ...provided,
                backgroundColor: state.isSelected ? "#48bb78" : "#fff",
                "&:hover": { backgroundColor: "#68d391" },
              }),
            }}
          />
        </div>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
        {filteredBooks.map((book) => (
          <div
            key={book.name}
            className="bg-white rounded-lg shadow-lg p-4 flex flex-col items-start hover:shadow-2xl transition-shadow duration-300"
          >
            <div className="text-lg font-semibold flex items-center">
              <FaBook className="text-indigo-500 mr-2" />
              {book.name}
            </div>
            <div className="mt-2 flex items-center">
              <FaLayerGroup className="text-green-500 mr-2" />
              <span className="text-gray-600">{book.category}</span>
            </div>
            <div className="flex items-center justify-between w-full">
              <div className="flex items-center">
                <FaRupeeSign className="text-red-500 mr-2" />
                <span className="text-gray-800 font-bold">
                  {book.rentPerDay}
                </span>
                <span className="ml-1 text-gray-600">/ day</span>
              </div>
              <div>
                {isLoggedIn ? (
                  <button
                    onClick={() => openModal(book)}
                    className="bg-gray-500 hover:bg-gray-700 text-white font-bold py-1 px-3 rounded-md text-sm"
                  >
                    Rent
                  </button>
                ) : (
                  <Link
                    to="/login"
                    className="bg-gray-500 hover:bg-gray-700 text-white font-bold py-1 px-3 rounded-md text-sm"
                  >
                    Rent
                  </Link>
                )}
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Modal */}
      {showModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-gray-800 bg-opacity-75">
          <div className="bg-white rounded-lg p-6 w-full max-w-md mx-auto">
            <TransactionForm
              bookId={selectedBook._id}
              closeModal={closeModal}
              dailyRent={selectedBook.rentPerDay}
            />
          </div>
        </div>
      )}
    </div>
  );
};

export default BookList;
