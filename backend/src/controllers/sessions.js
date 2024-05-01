const { Pool } = require("pg");
const pool = new Pool({
  connectionString: process.env.POSTGRES_URI,
});

const getUserSessions = async (req, res) => {
  try {
    const { username } = req.params;
    const result = await pool.query(
      `SELECT sessions.*, gyms.gymname FROM sessions JOIN gyms ON sessions.gymid = gyms.id WHERE (hostname = '${username}' OR attendee = '${username}');`
    );
    res.json(result.rows);
  } catch (error) {
    console.error(error.message);
    res.json({ status: "error", msg: "error getting your sessions" });
  }
};

const getAllSessions = async (req, res) => {
  try {
    const result = await pool.query(
      "SELECT sessions.*, gyms.gymname FROM sessions JOIN gyms ON sessions.gymid = gyms.id ORDER BY sessions.sessiondate ASC;"
    );
    res.json(result.rows);
  } catch (error) {
    console.error(error.message);
    res.json({ status: "error", msg: "error getting all sessions" });
  }
};

const getUserLatestSession = async (req, res) => {
  try {
    const { username } = req.params;
    const result = await pool.query(
      `SELECT gyms.*, sessions.sessiondate
      FROM gyms
      LEFT JOIN sessions ON gyms.id = sessions.gymid ORDER BY gyms.resetdate ASC;
      `
    ); //LEFT JOIN so will also returns null from those gyms with no latest visit
    res.json(result.rows);
  } catch (error) {
    console.error(error.message);
    res.json({ status: "error", msg: "error getting your sessions" });
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

    const query = `
       UPDATE sessions
       SET sessiondate = COALESCE($1, sessiondate),
           hostname = COALESCE($2, hostname),
           gymid = COALESCE($3, gymid)
       WHERE id = $4
       RETURNING *
     `;

    const values = [sessiondate, hostname, gymid, id];

    const result = await pool.query(query, values);
    res.json(result.rows[0]);
  } catch (error) {
    console.error(error.message);
    res.status(500).json({ status: "error", msg: "error updating session" });
  }
};

const joinSession = async (req, res) => {
  try {
    const { id } = req.params;
    let { username } = req.body; // if user wanna specify how many used other default to 1
    const query = `UPDATE sessions SET attendee = $2 WHERE id = $1 RETURNING *`;
    const result = await pool.query(query, [id, username]);
    res.json(result.rows);
  } catch (error) {
    console.error(error.message);
    res.status(500).json({ status: "error", msg: "error joining session" });
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
  getUserSessions,
  joinSession,
  getUserLatestSession,
};
