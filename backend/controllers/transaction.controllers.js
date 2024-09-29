// controllers/transaction.controller.js

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
