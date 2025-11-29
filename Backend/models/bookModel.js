const mongoose = require('mongoose');

const bookSchema = new mongoose.Schema({
    title: {
        type: String,
        required: [true, 'Book title is required'],
        trim: true,
    },
    author: {
        type: String,
        required: [true, 'Author name is required'],
        trim: true,
    },
    description: {
        type: String,
        required: [true, 'Book description is required'],
        maxlength: 2000,
    },
    category: {
        type: String,
        required: [true, 'Book category is required'],
        enum: ['Fiction', 'Non-Fiction', 'Science', 'Fantasy', 'Thriller', 'Biography', 'Other'],
        default: 'Other',
    },
    price: {
        type: Number,
        required: [true, 'Book price is required'],
        min: 0,
    },
    coverPicUrl: {
        type: String,
        required: [true, 'Cover picture URL is required'],
    },

}, {
    timestamps: true
});

const Book = mongoose.model('Book', bookSchema);
module.exports = Book;