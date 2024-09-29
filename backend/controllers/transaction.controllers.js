import Transaction from "../models/transaction.model.js";
import Book from "../models/book.model.js";
import UserModel from "../models/user.model.js";

export const createTransaction = async (req, res) => {
  const { bookId, userId, issueDate, returnDate, dailyRent } = req.body;

  try {
    const bookExists = await Book.findById(bookId);
    const userExists = await UserModel.findById(userId);

    if (!bookExists || !userExists) {
      return res.status(400).json({ message: "Invalid book or user ID" });
    }

    const issue = new Date(issueDate);
    const returnD = new Date(returnDate);
    const diffDays = Math.ceil(
      Math.abs(returnD - issue) / (1000 * 60 * 60 * 24)
    );

    const totalRent = diffDays * dailyRent;

    const newTransaction = new Transaction({
      bookId,
      userId,
      issueDate,
      returnDate,
      totalRent,
    });

    await newTransaction.save();

    res.status(201).json({
      message: "Transaction created successfully",
      transaction: newTransaction,
    });
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

export const getTotalRentGenerated = async (req, res) => {
  const { bookName } = req.query;

  try {
    const book = await Book.findOne({ name: bookName });

    if (!book) {
      return res.status(404).json({ message: "Book not found" });
    }

    const transactions = await Transaction.find({ bookId: book._id });

    const totalRent = transactions.reduce((acc, transaction) => {
      return acc + (transaction.totalRent || 0);
    }, 0);

    res.json({
      bookName: bookName,
      totalRentGenerated: totalRent,
    });
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
};

export const getBooksIssuedToUser = async (req, res) => {
  const { userId } = req.params;

  try {
    const transactions = await Transaction.find({ userId }).populate(
      "bookId",
      "name category"
    );

    if (!transactions.length) {
      return res.status(404).json({ message: "No books issued to this user." });
    }

    const issuedBooks = transactions.map((transaction) => ({
      bookName: transaction.bookId.name,
      category: transaction.bookId.category,
      issueDate: transaction.issueDate,
      returnDate: transaction.returnDate,
    }));

    return res.json({ issuedBooks });
  } catch (error) {
    return res.status(500).json({ message: "Error fetching issued books." });
  }
};

export const getBooksIssuedInDateRange = async (req, res) => {
  const { startDate, endDate } = req.query;

  try {
    const transactions = await Transaction.find({
      issueDate: { $gte: new Date(startDate), $lte: new Date(endDate) },
    })
      .populate("bookId", "name category")
      .populate("userId", "username email");

    if (!transactions || transactions.length === 0) {
      return res
        .status(404)
        .json({ message: "No transactions found in the specified date range" });
    }

    res.json(transactions);
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error retrieving transactions", error: error.message });
  }
};

export const getBookTransactions = async (req, res) => {
  const { bookName } = req.query;

  try {
    const book = await Book.findOne({ name: bookName });

    if (!book) {
      return res.status(404).json({ message: "Book not found" });
    }

    const transactions = await Transaction.find({ bookId: book._id })
      .populate("userId", "username email")
      .exec();

    const totalIssuedCount = transactions.length;

    const currentlyIssued = transactions.find(
      (transaction) =>
        !transaction.returnDate || new Date(transaction.returnDate) > new Date()
    );

    const currentStatus = currentlyIssued
      ? {
          message: `Currently issued to ${currentlyIssued.userId.username} (${currentlyIssued.userId.email})`,
        }
      : { message: "Not issued at the moment" };

    const result = {
      totalIssuedCount,
      currentlyIssued: currentStatus.message,
      allPreviousIssued: transactions.map((transaction) => ({
        username: transaction.userId.username,
        email: transaction.userId.email,
        issueDate: transaction.issueDate,
        returnDate: transaction.returnDate,
      })),
    };

    res.json(result);
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error fetching transactions", error: error.message });
  }
};
