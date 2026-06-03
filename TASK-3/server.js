const express = require('express');
const cors = require('cors');
const app = express();

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.static('public'));

// In-memory database
let books = [
  { id: 1, title: 'The Great Gatsby', author: 'F. Scott Fitzgerald' },
  { id: 2, title: 'To Kill a Mockingbird', author: 'Harper Lee' },
  { id: 3, title: '1984', author: 'George Orwell' }
];

let nextId = 4;

// ============================================
// GET /api/books - Get all books
// ============================================
app.get('/api/books', (req, res) => {
  res.status(200).json({
    success: true,
    count: books.length,
    data: books
  });
});

// ============================================
// GET /api/books/:id - Get a book by ID
// ============================================
app.get('/api/books/:id', (req, res) => {
  const book = books.find(b => b.id === parseInt(req.params.id));
  
  if (!book) {
    return res.status(404).json({
      success: false,
      message: 'Book not found'
    });
  }
  
  res.status(200).json({
    success: true,
    data: book
  });
});

// ============================================
// POST /api/books - Create a new book
// ============================================
app.post('/api/books', (req, res) => {
  const { title, author } = req.body;
  
  // Validation
  if (!title || !author) {
    return res.status(400).json({
      success: false,
      message: 'Please provide title and author'
    });
  }
  
  if (title.trim().length === 0 || author.trim().length === 0) {
    return res.status(400).json({
      success: false,
      message: 'Title and author cannot be empty'
    });
  }
  
  const newBook = {
    id: nextId++,
    title: title.trim(),
    author: author.trim()
  };
  
  books.push(newBook);
  
  res.status(201).json({
    success: true,
    message: 'Book created successfully',
    data: newBook
  });
});

// ============================================
// PUT /api/books/:id - Update a book by ID
// ============================================
app.put('/api/books/:id', (req, res) => {
  const book = books.find(b => b.id === parseInt(req.params.id));
  
  if (!book) {
    return res.status(404).json({
      success: false,
      message: 'Book not found'
    });
  }
  
  const { title, author } = req.body;
  
  // Validation
  if (!title || !author) {
    return res.status(400).json({
      success: false,
      message: 'Please provide title and author'
    });
  }
  
  if (title.trim().length === 0 || author.trim().length === 0) {
    return res.status(400).json({
      success: false,
      message: 'Title and author cannot be empty'
    });
  }
  
  book.title = title.trim();
  book.author = author.trim();
  
  res.status(200).json({
    success: true,
    message: 'Book updated successfully',
    data: book
  });
});

// ============================================
// DELETE /api/books/:id - Delete a book by ID
// ============================================
app.delete('/api/books/:id', (req, res) => {
  const index = books.findIndex(b => b.id === parseInt(req.params.id));
  
  if (index === -1) {
    return res.status(404).json({
      success: false,
      message: 'Book not found'
    });
  }
  
  const deletedBook = books.splice(index, 1);
  
  res.status(200).json({
    success: true,
    message: 'Book deleted successfully',
    data: deletedBook[0]
  });
});

// ============================================
// Error handling middleware
// ============================================
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({
    success: false,
    message: 'Internal server error',
    error: process.env.NODE_ENV === 'development' ? err.message : undefined
  });
});

// ============================================
// 404 handler
// ============================================
app.use((req, res) => {
  res.status(404).json({
    success: false,
    message: 'Route not found'
  });
});

// Start server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`🚀 Server is running on http://localhost:${PORT}`);
  console.log(`📚 API Documentation: http://localhost:${PORT}`);
});
