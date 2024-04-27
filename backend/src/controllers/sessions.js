const { Pool } = require("pg");
const pool = new Pool({
  connectionString: process.env.POSTGRES_URI,
});

const getAllSessions = async (req, res) => {
  try {
    const result = await pool.query(
      "SELECT sessions.*, gyms.gymname FROM sessions JOIN gyms ON sessions.gymid = gyms.id"
    );
    res.json(result.rows);
  } catch (error) {
    console.error(error.message);
    res.json({ status: "error", msg: "error getting all sesions" });
  }
};

const addNewSession = async (req, res) => {
  try {
    const { sessiondate, hostname, gymid } = req.body;
    const query = `INSERT INTO sessions (sessiondate, hostname, gymid) VALUES ($1, $2, $3) RETURNING *`; //$placeholder to prevent sql injection attack
    const result = await pool.query(query, [sessiondate, hostname, gymid]);
    res.json(result.rows[0]);
  } catch (error) {
    console.error(error.message);
    res
      .status(500)
      .json({ status: "error", msg: "error creating new session" });
  }
};

const updateSession = async (req, res) => {
  try {
    const { sessiondate, hostname, gymid } = req.body;
    const { id } = req.params;
    // Dynamically construct the SET part of the query
    let setClause = "";
    let values = [];
    let index = 1;
    if (sessiondate !== undefined) {
      setClause += `sessiondate = $${index++}, `;
      values.push(sessiondate);
    }
    if (hostname !== undefined) {
      setClause += `hostname = $${index++}, `;
      values.push(hostname);
    }
    if (gymid !== undefined) {
      setClause += `gymid = $${index++}, `;
      values.push(gymid);
    }
    // Remove the trailing comma and space
    setClause = setClause.slice(0, -2);
    const query = `UPDATE sesions SET ${setClause} WHERE id = $${index} RETURNING *`;
    values.push(id);

    const result = await pool.query(query, values);
    res.json(result.rows[0]);
  } catch (error) {
    console.error(error.message);
    res.status(500).json({ status: "error", msg: "error updating session" });
  }
};

const deleteSession = async (req, res) => {
  try {
    const { id } = req.params;
    const query = "DELETE FROM sessions WHERE id = $1";

    const result = await pool.query(query, [id]);
    if (result.rowCount === 0) {
      return res.status(404).json({ message: "session not found" });
    }
    res.json({ message: "session deleted successfully" });
  } catch (error) {
    console.error(error.message);
    res.status(500).json({ status: "error", msg: "error deleting session" });
  }
};

module.exports = {
  getAllSessions,
  addNewSession,
  updateSession,
  deleteSession,
};
