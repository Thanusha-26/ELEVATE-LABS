# 🚀 Quick Setup Guide

## Installation & Running

### 1. Extract the Project
Unzip the `book-api.zip` file to your desired location.

### 2. Open Terminal/Command Prompt
Navigate to the project directory:
```bash
cd book-api
```

### 3. Install Dependencies
```bash
npm install
```

This will install:
- **express** - Web framework
- **cors** - Enable cross-origin requests
- **nodemon** - (dev only) Auto-reload on file changes

### 4. Start the Server
**Option A - Production mode:**
```bash
npm start
```

**Option B - Development mode (with auto-reload):**
```bash
npm run dev
```

You should see:
```
🚀 Server is running on http://localhost:3000
📚 API Documentation: http://localhost:3000
```

### 5. Access the Application
Open your browser and go to:
```
http://localhost:3000
```

---

## 📱 Frontend Features

### ➕ Add New Book
1. Enter book title and author name
2. Click "Add Book"
3. Book appears in the list instantly

### ✏️ Update Book
1. Enter the Book ID you want to update
2. Enter new title and author
3. Click "Update Book"
4. Changes reflect immediately

### 📖 View All Books
- All books display in a beautiful card layout
- Shows book title, author, and ID
- Easy access to edit and delete buttons

### 🗑️ Delete Book
1. Click "Delete" button on any book
2. Confirm deletion
3. Book is removed from the list

---

## 🧪 API Testing

### Using the Frontend (Easiest)
Just use the web interface at http://localhost:3000

### Using Postman

**1. Install Postman:**
- Download from: https://www.postman.com/downloads/

**2. Import the Collection:**
- Open Postman
- Click "Import" (top left)
- Select `Book-API-Postman-Collection.json` from the project
- All 5 endpoints are ready to test!

**3. Test Endpoints:**
- Click any request
- Adjust parameters if needed
- Click "Send"
- View response below

### Using cURL (Command Line)

**Get all books:**
```bash
curl http://localhost:3000/api/books
```

**Add a new book:**
```bash
curl -X POST http://localhost:3000/api/books \
  -H "Content-Type: application/json" \
  -d '{"title": "My Book", "author": "My Name"}'
```

**Update a book:**
```bash
curl -X PUT http://localhost:3000/api/books/1 \
  -H "Content-Type: application/json" \
  -d '{"title": "New Title", "author": "New Author"}'
```

**Delete a book:**
```bash
curl -X DELETE http://localhost:3000/api/books/1
```

---

## 📂 Project Files Explained

```
book-api/
├── server.js                          # Main API server
├── package.json                       # Project dependencies
├── package-lock.json                  # Dependency versions
├── .gitignore                         # Git ignore rules
├── README.md                          # Full documentation
├── SETUP.md                           # This file
├── Book-API-Postman-Collection.json   # Postman tests
└── public/
    └── index.html                     # Frontend UI
```

---

## 🐛 Troubleshooting

### Port 3000 Already in Use
```bash
# On Windows
netstat -ano | findstr :3000

# On Mac/Linux
lsof -i :3000

# Then kill the process and restart
npm start
```

### npm install fails
- Make sure Node.js is installed: `node --version`
- Delete `node_modules` folder and `package-lock.json`
- Run `npm install` again

### Frontend not loading
- Make sure server is running (check terminal)
- Refresh browser (Ctrl+R or Cmd+R)
- Check browser console for errors (F12)

### API endpoints not working
- Verify server is running on port 3000
- Check API URL in browser network tab (F12)
- Ensure JSON body has "title" and "author" fields

---

## 📝 Basic API Examples

### Create a Book
```json
POST http://localhost:3000/api/books
Content-Type: application/json

{
  "title": "Clean Code",
  "author": "Robert C. Martin"
}
```

### Response
```json
{
  "success": true,
  "message": "Book created successfully",
  "data": {
    "id": 4,
    "title": "Clean Code",
    "author": "Robert C. Martin"
  }
}
```

---

## 💡 Key Features

✅ **5 API Endpoints** - GET, POST, PUT, DELETE operations
✅ **RESTful Design** - Follows REST architecture
✅ **JSON Responses** - Consistent response format
✅ **Error Handling** - Proper validation and errors
✅ **CORS Enabled** - Works across domains
✅ **Beautiful UI** - Modern, responsive interface
✅ **Live Updates** - Frontend syncs with API
✅ **No Database** - In-memory storage (perfect for learning)

---

## 🎯 Learning Outcomes

After completing this project, you'll understand:
- REST API principles
- HTTP methods (GET, POST, PUT, DELETE)
- Express.js routing
- Middleware usage
- JSON handling
- Error handling
- API testing with Postman
- Frontend-Backend integration

---

## 🔗 Useful Links

- **Node.js**: https://nodejs.org/
- **Express.js**: https://expressjs.com/
- **Postman**: https://www.postman.com/
- **MDN Docs**: https://developer.mozilla.org/
- **REST API Guide**: https://restfulapi.net/

---

## 📞 Next Steps

1. ✅ Run the server
2. ✅ Test all endpoints
3. ✅ Understand the code
4. ✅ Modify and experiment
5. ✅ Add new features (search, filtering, etc.)
6. ✅ Deploy to the cloud

---

**Ready to build awesome APIs? Let's go! 🚀**
