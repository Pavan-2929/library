import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Register from "./pages/Register";
import Login from "./pages/Login";
import Navbar from "./components/Navbar";
import TransactionForm from "./pages/Transaction";
import TotalRentGenerated from "./components/TotalRentGenerated";
import BooksIssued from "./components/BooksIssued";
import BooksIssuedInDateRange from "./components/BooksIssuedDate";
import BookTransactions from "./components/BookTransaction";

function App() {
  return (
    <>
      <BrowserRouter>
        <Navbar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/register" element={<Register />} />
          <Route path="/login" element={<Login />} />
          <Route path="/test" element={<BookTransactions />} />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
