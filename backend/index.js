import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import dbConnection from "./db.js";
import authRouter from "./routes/auth.routes.js";
import bookRouter from "./routes/book.routes.js";
import transactionRouter from "./routes/transaction.routes.js";
dotenv.config();

const app = express();

app.use(express.json());
app.use(
  cors({ credentials: true, origin: "https://library-1-fxpt.onrender.com" })
);

dbConnection();

app.use("/api/auth", authRouter);
app.use("/api/book", bookRouter);
app.use("/api", transactionRouter);

app.get("/", (req, res) => {
  res.send("Hello, World!");
});

app.use((err, req, res, next) => {
  const statusCode = err.statusCode || 500;
  const message = err.message || "Internal Server Error";

  return res.status(statusCode).json({
    success: false,
    statusCode,
    message,
  });
});

app.listen(process.env.PORT || 3000, () => {
  console.log(`server listening on port ${process.env.PORT}`);
});
