const { Pool } = require("pg");

const connectDB = async () => {
  try {
    const pool = new Pool({
      connectionString: process.env.POSTGRES_URI,
    });
    await pool.connect();
    console.log("PostgreSQL connected");
    return pool;
  } catch (error) {
    console.error("Error connecting to PostgreSQL:", error);
    process.exit(1);
  }
};

module.exports = connectDB;
