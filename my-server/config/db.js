// Import the Pool class from the 'pg' module
const Pool = require("pg").Pool;

// Create a new Pool instance with the specified configuration options
const pool = new Pool({
  user: "postgres",
  password: "Jeni3604",
  port: 5432,
  database: "Taskify",
});

// Export the pool instance
module.exports = pool;