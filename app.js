const express = require('express');
const bodyParser = require('body-parser');

const app = express();
app.use(bodyParser.json());

let books = [];

// Create a new book
app.post('/books', (req, res) => {
    const book = req.body;
    books.push(book);
    res.status(201).send('Book added successfully');
});

// Read all books
app.get('/books', (req, res) => {
    res.json(books);
});

// Read a specific book by ID
app.get('/books/:id', (req, res) => {
    const id = req.params.id;
    const book = books.find(book => book.id === id);
    if (book) {
        res.json(book);
    } else {
        res.status(404).send('Book not found');
    }
});

// Update a book by ID
app.put('/books/:id', (req, res) => {
    const id = req.params.id;
    const updatedBook = req.body;
    books = books.map(book => {
        if (book.id === id) {
            return { ...book, ...updatedBook };
        }
        return book;
    });
    res.send('Book updated successfully');
});

// Delete a book by ID
app.delete('/books/:id', (req, res) => {
    const id = req.params.id;
    books = books.filter(book => book.id !== id);
    res.send('Book deleted successfully');
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server is running on port ${PORT}`));