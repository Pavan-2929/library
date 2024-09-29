import Book from "../models/book.model.js";

export const getBooks = async (req, res, next) => {
  try {
    const books = await Book.find();

    res.send(books);
  } catch (error) {
    console.log(error);
  }
};


