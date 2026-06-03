# 📚 Book API - REST API for Book Management

A simple, professional REST API built with Node.js and Express for managing a collection of books with full CRUD operations. Includes a beautiful frontend interface for easy interaction.

## 🌟 Features

- ✅ **Complete CRUD Operations** - Create, Read, Update, Delete books
- ✅ **REST API** - Professional API endpoints with proper HTTP methods
- ✅ **In-Memory Storage** - Simple data persistence using JavaScript arrays
- ✅ **JSON Responses** - Consistent JSON response format with success/error handling
- ✅ **CORS Enabled** - Cross-Origin Resource Sharing support
- ✅ **Error Handling** - Comprehensive error handling and validation
- ✅ **Professional Frontend** - Beautiful, responsive UI to interact with the API
- ✅ **Documentation** - Full API documentation and examples

## 📋 Project Structure

```
book-api/
├── server.js              # Main Express server
├── package.json           # Dependencies and scripts
├── package-lock.json      # Dependency lock file
├── public/
│   └── index.html        # Frontend UI
├── README.md             # This file
└── .gitignore            # Git ignore file
```

## 🚀 Quick Start

### Prerequisites
- **Node.js** (v14 or higher) - [Download](https://nodejs.org/)
- **npm** (comes with Node.js)

### Installation Steps

1. **Clone or Download the project**
   ```bash
   git clone https://github.com/yourusername/book-api.git
   cd book-api
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Start the server**
   ```bash
   npm start
   ```
   
   Or for development with auto-reload:
   ```bash
   npm run dev
   ```

4. **Access the application**
   - Open your browser and go to: `http://localhost:3000`
   - API base URL: `http://localhost:3000/api/books`

## 📖 API Endpoints

### 1. **GET /api/books** - Get All Books
Returns a list of all books in the collection.

**Request:**
```bash
curl http://localhost:3000/api/books
```

**Response (200 OK):**
```json
{
  "success": true,
  "count": 3,
  "data": [
    {
      "id": 1,
      "title": "The Great Gatsby",
      "author": "F. Scott Fitzgerald"
    },
    {
      "id": 2,
      "title": "To Kill a Mockingbird",
      "author": "Harper Lee"
    },
    {
      "id": 3,
      "title": "1984",
      "author": "George Orwell"
    }
  ]
}
```

---

### 2. **GET /api/books/:id** - Get Book by ID
Returns a specific book by its ID.

**Request:**
```bash
curl http://localhost:3000/api/books/1
```

**Response (200 OK):**
```json
{
  "success": true,
  "data": {
    "id": 1,
    "title": "The Great Gatsby",
    "author": "F. Scott Fitzgerald"
  }
}
```

**Response (404 Not Found):**
```json
{
  "success": false,
  "message": "Book not found"
}
```

---

### 3. **POST /api/books** - Create New Book
Adds a new book to the collection.

**Request:**
```bash
curl -X POST http://localhost:3000/api/books \
  -H "Content-Type: application/json" \
  -d '{
    "title": "The Hobbit",
    "author": "J.R.R. Tolkien"
  }'
```

**Request Body:**
```json
{
  "title": "The Hobbit",
  "author": "J.R.R. Tolkien"
}
```

**Response (201 Created):**
```json
{
  "success": true,
  "message": "Book created successfully",
  "data": {
    "id": 4,
    "title": "The Hobbit",
    "author": "J.R.R. Tolkien"
  }
}
```

**Response (400 Bad Request):**
```json
{
  "success": false,
  "message": "Please provide title and author"
}
```

---

### 4. **PUT /api/books/:id** - Update Book
Updates an existing book by ID.

**Request:**
```bash
curl -X PUT http://localhost:3000/api/books/1 \
  -H "Content-Type: application/json" \
  -d '{
    "title": "The Great Gatsby (Revised)",
    "author": "F. Scott Fitzgerald"
  }'
```

**Request Body:**
```json
{
  "title": "The Great Gatsby (Revised)",
  "author": "F. Scott Fitzgerald"
}
```

**Response (200 OK):**
```json
{
  "success": true,
  "message": "Book updated successfully",
  "data": {
    "id": 1,
    "title": "The Great Gatsby (Revised)",
    "author": "F. Scott Fitzgerald"
  }
}
```

**Response (404 Not Found):**
```json
{
  "success": false,
  "message": "Book not found"
}
```

---

### 5. **DELETE /api/books/:id** - Delete Book
Removes a book from the collection.

**Request:**
```bash
curl -X DELETE http://localhost:3000/api/books/1
```

**Response (200 OK):**
```json
{
  "success": true,
  "message": "Book deleted successfully",
  "data": {
    "id": 1,
    "title": "The Great Gatsby",
    "author": "F. Scott Fitzgerald"
  }
}
```

**Response (404 Not Found):**
```json
{
  "success": false,
  "message": "Book not found"
}
```

---

## 📊 HTTP Status Codes

| Status Code | Meaning | Use Case |
|-------------|---------|----------|
| **200** | OK | Successful GET, PUT, DELETE |
| **201** | Created | Successful POST |
| **400** | Bad Request | Invalid input or missing fields |
| **404** | Not Found | Book ID doesn't exist |
| **500** | Internal Server Error | Server error |

## 🧪 Testing with Postman

### Step 1: Download & Install Postman
- Download from: https://www.postman.com/downloads/

### Step 2: Create Requests

**Test GET /api/books:**
- Method: `GET`
- URL: `http://localhost:3000/api/books`
- Click Send

**Test POST /api/books:**
- Method: `POST`
- URL: `http://localhost:3000/api/books`
- Headers: `Content-Type: application/json`
- Body (raw JSON):
  ```json
  {
    "title": "New Book Title",
    "author": "Author Name"
  }
  ```
- Click Send

**Test PUT /api/books/:id:**
- Method: `PUT`
- URL: `http://localhost:3000/api/books/1`
- Headers: `Content-Type: application/json`
- Body (raw JSON):
  ```json
  {
    "title": "Updated Title",
    "author": "Updated Author"
  }
  ```
- Click Send

**Test DELETE /api/books/:id:**
- Method: `DELETE`
- URL: `http://localhost:3000/api/books/1`
- Click Send

---

## 🔑 Key Concepts Explained

### What is REST?
REST (Representational State Transfer) is an architectural style for APIs that uses standard HTTP methods to perform operations on resources. It's stateless and uses URLs to identify resources.

### HTTP Methods in CRUD
- **GET** - Read data (Safe, Idempotent)
- **POST** - Create new data (Not idempotent)
- **PUT** - Update existing data (Idempotent)
- **DELETE** - Remove data (Idempotent)

### Middleware in Express
Middleware are functions that have access to request and response objects. They can modify requests, authenticate users, log data, etc.

```javascript
app.use(express.json());        // Parse JSON bodies
app.use(cors());                // Enable CORS
app.use(express.static('public')); // Serve static files
```

### JSON Response Format
All API responses follow a consistent format:
```json
{
  "success": boolean,
  "message": "Human readable message",
  "data": {} // or array
}
```

### Error Handling
The API includes:
- Input validation
- Try-catch blocks for async operations
- Consistent error response format
- Appropriate HTTP status codes

---

## 📁 File Descriptions

### `server.js`
Main Express server file containing:
- Express app initialization
- Middleware configuration (CORS, JSON parsing)
- In-memory books array
- All 5 API endpoints
- Error handling middleware
- 404 handler

### `package.json`
Project configuration including:
- Project metadata
- NPM scripts (start, dev)
- Dependencies: express, cors
- Dev dependencies: nodemon

### `public/index.html`
Frontend interface featuring:
- Modern, responsive UI
- Add book form
- Update book form
- Books list display
- API integration using Fetch API
- Loading states and status messages
- Error handling

---

## 🛠️ Technologies Used

- **Node.js** - JavaScript runtime
- **Express.js** - Web framework
- **CORS** - Cross-Origin Resource Sharing
- **HTML5** - Frontend markup
- **CSS3** - Styling and animations
- **Vanilla JavaScript** - Frontend interactivity
- **Fetch API** - HTTP requests from frontend

---

## 🚀 Deployment

### Deploy to Heroku

1. **Install Heroku CLI**
   ```bash
   npm install -g heroku
   ```

2. **Create Heroku account and login**
   ```bash
   heroku login
   ```

3. **Create Heroku app**
   ```bash
   heroku create your-app-name
   ```

4. **Deploy**
   ```bash
   git push heroku main
   ```

5. **View live app**
   ```bash
   heroku open
   ```

---

## 📚 Learning Resources

- [Express.js Documentation](https://expressjs.com/)
- [MDN REST API Guide](https://developer.mozilla.org/en-US/docs/Glossary/REST)
- [Node.js Documentation](https://nodejs.org/docs/)
- [Postman Learning Center](https://learning.postman.com/)

---

## ✅ Interview Questions Answer Guide

### 1. What is REST?
REST (Representational State Transfer) is an architectural style for designing networked applications. It uses HTTP methods (GET, POST, PUT, DELETE) to perform CRUD operations on resources identified by URLs.

### 2. What are HTTP methods and their use?
- **GET** - Retrieve data (safe, idempotent)
- **POST** - Create new resource (not idempotent)
- **PUT** - Update existing resource (idempotent)
- **DELETE** - Remove resource (idempotent)
- **PATCH** - Partial update

### 3. How do you handle routes in Express?
```javascript
app.get('/path', (req, res) => { /* handler */ });
app.post('/path', (req, res) => { /* handler */ });
app.put('/path/:id', (req, res) => { /* handler */ });
app.delete('/path/:id', (req, res) => { /* handler */ });
```

### 4. What is middleware in Express?
Middleware are functions that have access to request, response, and next objects. They can execute code, modify request/response, end cycles, or call next middleware.

### 5. How do you parse JSON in Express?
```javascript
app.use(express.json()); // Built-in middleware
```

### 6. What status codes do you use for CRUD?
- **POST**: 201 (Created)
- **GET**: 200 (OK)
- **PUT**: 200 (OK)
- **DELETE**: 200 (OK)
- **Error**: 400, 404, 500

### 7. How would you handle errors in Express?
Using try-catch for async, error middleware, and proper status codes.

### 8. What is CORS?
Cross-Origin Resource Sharing allows restricted resources to be accessed from other domains. Enable with: `app.use(cors());`

### 9. Explain request and response objects in Express
- **req**: Contains request data (body, params, query, headers)
- **res**: Object to send responses back to client

### 10. How do you test API endpoints?
Using tools like Postman, cURL, or automated testing with Jest/Mocha.

---

## 📝 License

MIT License - Feel free to use this project for learning and personal use.

---

## 👨‍💻 Author

Created as a Web Development Internship Task

---

## 🤝 Contributing

Feel free to fork, modify, and submit pull requests!

---

## 📞 Support

For issues or questions, please open an issue on GitHub or contact the author.

---

**Happy Coding! 🎉**
