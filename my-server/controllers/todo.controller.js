// importing database connection pool
const pool = require("../config/db");
// importing uuid library for generating unique IDs
const { v4: uuidv4 } = require("uuid");

// function to create a new todo
exports.createTodo = async (req, res) => {
  try {
    // extract data from request body
    let { user_id, title, progress, date } = req.body;
    // generate unique ID for the todo
    const id = uuidv4();
    // trimming whitespace from the title
    title = title.trim();
    // setting initial task status as false
    task_status = false;
    
    // sql query
    const sql =
      "INSERT INTO todos (id,user_id,title,progress,date,status) VALUES($1,$2,$3,$4,$5,$6) RETURNING *";
    const newTodo = await pool.query(sql, [id, user_id, title, progress, date, task_status]);
    
    // JSON responses
    res.status(201).json({
      status: "success",
      message: "Todo created",
      data: { todo: newTodo.rows[0] },
    });
  } catch (error) {
    res.status(500).json({
      status: "error",
      message: "Failed to create todo",
      errorMessage: error.message,
      error,
    });
  }
};

// function to update existing todo
exports.updateTodo = async (req, res) => {
  try {
    // extracting todo ID from request parameters
    const { id } = req.params;
    // extracting updated todo data from request body
    let { user_id, title, progress, date } = req.body;
    // trimming whitespace from the title
    title = title.trim();
    
    // sql query
    const updatedTodo = await pool.query(
      "UPDATE todos SET user_id=$1, title=$2,progress=$3,date=$4 WHERE id=$5",
      [user_id, title, progress, date, id]
    );
    
    // JSON responses
    res.status(200).json({
      status: "success",
      message: "Todo updated",
      data: { todo: updatedTodo.rows[0] },
    });
  } catch (error) {
    res.status(500).json({
      status: "error",
      message: "Failed to update todo",
      errorMessage: error.message,
      error,
    });
  }
};

// function to delete an existing todo
exports.deleteTodo = async (req, res) => {
  try {
    // extracting todo ID from request parameters
    const { id } = req.params;
    // SQL Query
    await pool.query("DELETE FROM todos WHERE id=$1", [id]);
    // JSON responses
    res.status(200).json({
      status: "success",
      message: "Todo deleted",
    });
  } catch (error) {
    res.status(500).json({
      status: "error",
      message: "Failed to delete todo",
      errorMessage: error.message,
      error,
    });
  }
};

// function to retrieve all todos
exports.getAllTodos = async (req, res) => {
  try {
    // SQL query
    const todos = await pool.query("SELECT * FROM todos");
    // JSON responses
    res.status(200).json({
      staus: "success",
      result: todos.rowCount,
      data: { todos: todos.rows },
    });
  } catch (error) {
    res.status(500).json({
      status: "error",
      message: "Failed to get todos",
      errorMessage: error.message,
      error,
    });
  }
};

// function to retrieve a specific todo by ID
exports.getTodo = async (req, res) => {
  try {
    // extracting todo ID from request parameters
    let { id } = req.params;
    // SQL query
    const todo = await pool.query("SELECT * FROM todos WHERE id=$1", [id]);
    // Check whether todo with given ID exists
    if (todo.rowCount === 0) {
      // JSON responses
      return res.status(404).json({
        staus: "fail",
        message: `Todo with id ${id} not found`,
      });
    }
    res.status(200).json({
      staus: "success",
      data: { todo: todo.rows[0] },
    });
  } catch (error) {
    res.status(500).json({
      status: "error",
      message: "Failed to get a todo",
      errorMessage: error.message,
      error,
    });
  }
};

// function to retrieve todos associated with a specific user
exports.getUserTodos = async (req, res) => {
  try {
    // Extracting user ID from request parameters
    const { id } = req.params;
    // SQL query
    const todos = await pool.query("SELECT * FROM todos WHERE user_id=$1", [
      id,
    ]);
    // JSON responses
    res.status(200).json({
      staus: "success",
      result: todos.rowCount,
      data: { todos: todos.rows },
    });
  } catch (error) {
    res.status(500).json({
      status: "error",
      message: "Failed to get todos",
      errorMessage: error.message,
      error,
    });
  }
};

// function to toggle completion status of a todo
exports.updateTodoCompletion = async (req, res) => {
  try {
    // Extracting todo IDfrom request parameters
    const { id } = req.params;
    // Extracting updated todo data from request body
    let { user_id, title, progress, date, status } = req.body;
    // trimming whitespace from the title
    title = title.trim();
    
    // SQL query
    const updatedTodo = await pool.query(
      "UPDATE todos SET user_id=$1, title=$2, progress=$3, date=$4, status=$5 WHERE id=$6",
      [user_id, title, progress, date, !status, id]
    );

    // JSON responses
    res.status(200).json({
      status: "success",
      message: "Todo updated",
      data: { todo: updatedTodo.rows[0] },
    });
  } catch (error) {
    res.status(500).json({
      status: "error",
      message: "Failed to update todo",
      errorMessage: error.message,
      error,
    });
  }
};