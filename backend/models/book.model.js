import mongoose from "mongoose";

const bookSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    category: {
        type: String,
        required: true,
    },
    rentPerDay: {
        type: Number,
        required: true
    }
})

const Book = new mongoose.model("Book", bookSchema)

export default Book;