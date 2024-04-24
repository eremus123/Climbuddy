const { Pool } = require("pg");
const pool = new Pool({
  connectionString: process.env.POSTGRES_URI,
});

const getAllGyms = async (req, res) => {
  try {
    const result = await pool.query("SELECT * FROM gyms");
    res.json(result.rows);
  } catch (error) {
    console.error(error.message);
    res.json({ status: "error", msg: "error getting all gyms" });
  }
};

const addNewGym = async (req, res) => {
  try {
    const { gymname, address, openinghours, resetdate } = req.body;
    const query = `INSERT INTO gyms (gymname, address, openinghours,resetdate) VALUES ($1, $2, $3, $4) RETURNING *`; //$placeholder to prevent sql injection attack
    const result = await pool.query(query, [
      gymname,
      address,
      openinghours,
      resetdate,
    ]);
    res.json(result.rows[0]);
  } catch (error) {
    console.error(error.message);
    res.status(500).json({ status: "error", msg: "error adding new gym" });
  }
};

const updateGym = async (req, res) => {
  try {
    const { gymname, address, openinghours, resetdate } = req.body;
    const { gymId } = req.params;
    // Dynamically construct the SET part of the query
    let setClause = "";
    let values = [];
    let index = 1;
    if (gymname !== undefined) {
      setClause += `gymname = $${index++}, `;
      values.push(gymname);
    }
    if (address !== undefined) {
      setClause += `address = $${index++}, `;
      values.push(address);
    }
    if (openinghours !== undefined) {
      setClause += `openinghours = $${index++}, `;
      values.push(openinghours);
    }
    if (resetdate !== undefined) {
      setClause += `resetdate = $${index++}, `;
      values.push(resetdate);
    }
    // Remove the trailing comma and space
    setClause = setClause.slice(0, -2);
    const query = `UPDATE gyms SET ${setClause} WHERE id = $${index} RETURNING *`;
    values.push(gymId);

    const result = await pool.query(query, values);
    res.json(result.rows[0]);
  } catch (error) {
    console.error(error.message);
    res.status(500).json({ status: "error", msg: "error updating gym" });
  }
};

const deleteGym = async (req, res) => {
  try {
    const { id } = req.params;
    const query = "DELETE FROM gyms WHERE id = $1";

    const result = await pool.query(query, [id]);
    if (result.rowCount === 0) {
      return res.status(404).json({ message: "Gym not found" });
    }
    res.json({ message: "Gym deleted successfully" });
  } catch (error) {
    console.error(error.message);
    res.status(500).json({ status: "error", msg: "error deleting gym" });
  }
};

module.exports = {
  getAllGyms,
  addNewGym,
  updateGym,
  deleteGym,
};
