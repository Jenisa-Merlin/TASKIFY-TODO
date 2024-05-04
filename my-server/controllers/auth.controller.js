// importing database connection pool
const pool = require("../config/db");
// importing uuid library for generating unique IDs
const { v4: uuidv4 } = require("uuid");
// importing bcrypt library for password hashing
const bcrypt = require("bcryptjs");
// importing jsonwebtoken library for generating JWT tokens
const jwt = require("jsonwebtoken");

// function to handle user signup
exports.signup = async (req, res) => {
  try {
    // extracting username and password from request body
    let { username, password } = req.body;
    // trimming whitespace from username
    username = username.trim();
    // checking if username already exists in db
    const isUsernameExist = await pool.query(
      "SELECT * FROM users WHERE username=$1",
      [username]
    );
    if (isUsernameExist.rowCount!== 0)
      return res.status(400).json({
        staus: "fail",
        message: "Username is already taken",
      });

    // generating unique ID for the user
    const id = uuidv4();
    // generating a salt for password hashing
    const salt = bcrypt.genSaltSync(10);
    // hashing the password using bcrypt
    const hashedPassword = bcrypt.hashSync(password, salt);
    
    // SQL query
    await pool.query(
      "INSERT INTO users(id,username,password) VALUES($1,$2,$3)",
      [id, username, hashedPassword]
    );

    // Generate JWT token for user
    const token = jwt.sign({ id }, "secretkey", { expiresIn: "1h" });
    // JSON responses
    res.status(200).json({
      staus: "success",
      message: "account created",
      token,
      user: { id, username },
    });
  } catch (error) {
    res.status(500).json({
      status: "error",
      message: "Failed to create account",
      errorMessage: error.message,
      error,
    });
  }
};

// function to handle user login
exports.login = async (req, res) => {
  try {
    // extracting username, password from request body
    const { username, password } = req.body;
    // retrieve user info from database based on username
    const user = await pool.query("SELECT * FROM users WHERE username=$1", [
      username,
    ]);
    if (user.rowCount === 0)
      return res.status(404).json({
        staus: "fail",
        message: "Invalid username or password",
      });

    // checking if provided password matches the hashed password in database
    const checkPassword = bcrypt.compareSync(password, user.rows[0].password);
    if (!checkPassword)
      return res.status(404).json({
        staus: "fail",
        message: "Invalid username or password",
      });
    // extracting user ID
    const id = user.rows[0].id;
    // generating JWT token
    const token = jwt.sign({ id }, "secretkey", { expiresIn: "1h" });
    // JSON responses
    res.status(200).json({
      staus: "success",
      message: "login success",
      token,
      user: { id, username: user.rows[0].username },
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      status: "error",
      message: "Failed to log in user",
      errorMessage: error.message,
      error,
    });
  }
};