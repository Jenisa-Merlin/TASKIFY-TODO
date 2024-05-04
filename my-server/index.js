// imports Express framework - Node.js web application framework for building web applications and APIs
const express = require("express");
// imports CORS (Cross Origin Resource Sharing) middleware
const cors = require("cors");

// imports module containing routes for handling todo-related HTTP requests
const todoRoutes = require("./routes/todo.routes");
// imports module containing routes for handling authentication-related HTTP requests
const authRoutes = require("./routes/auth.routes");

// Creates Express application instance - define routes, middleware, settings for web server
const app = express();

// Middleware to add necessary headers to enable cross-origin resource sharing
app.use(cors()); 
// Middleware to parses JSON data sent in request body and exposes it in req.body of request handlers
app.use(express.json()); 

// Sets authentication related routes
app.use("/api/auth", authRoutes); 
// Sets todos related routes
app.use("/api/todos", todoRoutes); 

// defined port to listen Express server (can use process defined default port also)
const PORT = 8000;

// Listens on the specified port
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});