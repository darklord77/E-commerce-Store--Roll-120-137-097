import Book from '../models/Book.js';

export const getBooks = async (req, res) => {
    try {
        const books = await Book.find({});
        res.status(200).json(books);
    } catch (error) {
        res.status(500).json({ message: 'Error retrieving books', error });
    }
};

export const getBookById = async (req, res) => {
    try {
        const book = await Book.findById(req.params.id);
        if (!book) {
            return res.status(404).json({ message: 'Book not found' });
        }else{
            res.status(200).json(book);
        }
    } catch (error) {
        res.status(500).json({ message: 'Error retrieving book', error });
    }
};

export const createBook = async (req, res) => {
    try {
        const { title, author, description, category, price, coverPicUrl } = req.body;

        const newBook = new Book({  
            title,
            author,
            description,
            category,
            price,
            coverPicUrl,
        });
        
        const createdBook = await newBook.save();
        res.status(201).json(createdBook);
    } catch (error) {
        res.status(500).json({ message: 'Error creating book', error });
    }
};

export const updateBook = async (req, res) => {
    try {
        const { title, author, description, category, price, coverPicUrl } = req.body;

        const book = await Book.findByIdAndUpdate(req.params.id)
        if (book){
            book.title = title || book.title;
            book.author = author || book.author;
            book.description = description || book.description;
            book.category = category || book.category;
            book.price = price || book.price;
            book.coverPicUrl = coverPicUrl || book.coverPicUrl;

            const updatedBook =  await book.save();
            res.status(200).json(updatedBook);
        }else{  
            return res.status(404).json({ message: 'Book not found' });
        }       
    } catch (error) {
        res.status(500).json({ message: 'Error updating book', error });
    }
};
export const deleteBook = async (req, res) => {
    try {
        const book = await Book.findByIdAndDelete(req.params.id);
        if (book) {
            res.status(200).json({ message: 'Book deleted successfully' });
        } else {
            res.status(404).json({ message: 'Book not found' });
        }
    } catch (error) {
        res.status(500).json({ message: 'Error deleting book', error });
    }
};