import express from "express";
import {
  createTransaction,
  getBooksIssuedInDateRange,
  getBooksIssuedToUser,
  getBookTransactions,
  getTotalRentGenerated,
} from "../controllers/transaction.controllers.js";

const router = express.Router();

router.post("/transaction", createTransaction);
router.get("/rent-generated", getTotalRentGenerated);
router.get("/issued-books/:userId", getBooksIssuedToUser);
router.get("/transactions/date-range", getBooksIssuedInDateRange); 
router.get("/transactions/get", getBookTransactions); 

export default router;
