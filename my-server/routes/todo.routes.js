// import necessary modules
const express = require("express");
const todoController = require("../controllers/todo.controller");

// Creating an instance of the Express router
const router = express.Router();

// defining routes for todo operations
router.get("/", todoController.getAllTodos);
router.post("/", todoController.createTodo);
router.get("/:id", todoController.getTodo);
router.patch("/:id", todoController.updateTodo);
router.delete("/:id", todoController.deleteTodo);
router.get("/user/:id", todoController.getUserTodos);
router.put("/:id", todoController.updateTodoCompletion);

module.exports = router;
