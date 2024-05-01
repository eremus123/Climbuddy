const { Pool } = require("pg");
const pool = new Pool({
  connectionString: process.env.POSTGRES_URI,
});

const getUserPasses = async (req, res) => {
  try {
    const { username } = req.params;
    const result = await pool.query(
      `SELECT passes.*,gyms.gymname  FROM passes JOIN gyms ON passes.gymid = gyms.id WHERE username = '${username}'AND quantity > 0`
    );
    res.json(result.rows);
  } catch (error) {
    console.error(error.message);
    res.json({ status: "error", msg: "error getting your passes" });
  }
};

const buyPasses = async (req, res) => {
  try {
    const { username } = req.params;
    const { purchasedate, expirydate, costprice, gymid, quantity } = req.body;
    const query = `INSERT INTO passes (username, purchasedate, expirydate, costprice, gymid, quantity) VALUES ($1, COALESCE($2, (now())), COALESCE($3, (now() + interval '1 year')), $4, $5, $6) RETURNING *`;
    const result = await pool.query(query, [
      username,
      purchasedate, // COALESCE returns first non-null argument so will get default if empty
      expirydate,
      costprice,
      gymid,
      quantity,
    ]);
    res.json(result.rows[0]);
  } catch (error) {
    console.error(error.message);
    res.status(500).json({ status: "error", msg: "error buying passes" });
  }
};

const usePasses = async (req, res) => {
  try {
    const { id } = req.params;
    let { quantity } = req.body; // if user wanna specify how many used other default to 1
    quantity = parseInt(quantity) || 1; // Ensure quantity is a number, default to 1 if not provided
    const query = `UPDATE passes SET quantity = quantity - $2 WHERE id = $1 RETURNING *`;
    const result = await pool.query(query, [id, quantity]);
    res.json(result.rows);
  } catch (error) {
    console.error(error.message);
    res.status(500).json({ status: "error", msg: "error using passes" });
  }
};
//maybe add validator to check if the user logged in is the same person using the passes
//also check if enough passes to use

const clearPasses = async (req, res) => {
  try {
    const { id } = req.params;
    const query = "DELETE FROM passes WHERE id = $1";

    const result = await pool.query(query, [id]);
    if (result.rowCount === 0) {
      return res.status(404).json({ message: "passes not found" });
    }
    res.json({ message: "passes cleared successfully" });
  } catch (error) {
    console.error(error.message);
    res.status(500).json({ status: "error", msg: "error clearing passes" });
  }
};
module.exports = {
  getUserPasses,
  buyPasses,
  usePasses,
  clearPasses,
};
