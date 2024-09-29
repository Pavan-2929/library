import express from "express";
import { getBooks } from "../controllers/book.controllers.js";

const router = express.Router();

router.get("/get", getBooks);

export default router;
