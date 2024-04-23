const { Pool } = require("pg");
const pool = new Pool({
  connectionString: process.env.POSTGRES_URI,
});

const getAllRoles = async (req, res) => {
  try {
    const result = await pool.query("SELECT role FROM roles");
    const roles = result.rows.map((row) => row.role);
    res.json(roles);
  } catch (error) {
    console.error(error.message);
    res.status(400).json({ status: "error", msg: "cannot get role" });
  }
};
module.exports = { getAllRoles };
