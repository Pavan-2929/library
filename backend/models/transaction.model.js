import mongoose from "mongoose";

const TransactionSchema = new mongoose.Schema({
  bookId: { type: mongoose.Schema.Types.ObjectId, ref: "Book", required: true },
  userId: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
  issueDate: { type: Date, required: true },
  returnDate: { type: Date, required: true },
  totalRent: { type: Number },
});

const Transaction = new mongoose.model("Transaction", TransactionSchema);

export default Transaction;
