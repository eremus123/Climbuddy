const { Pool } = require("pg");
const pool = new Pool({
  connectionString: process.env.POSTGRES_URI,
});
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const { v4: uuidv4 } = require("uuid");

const getAllUsers = async (req, res) => {
  try {
    const result = await pool.query("SELECT username, role FROM users");
    const users = result.rows;

    const outputArray = users.map((user) => ({
      username: user.username,
      role: user.role,
    }));

    res.json(outputArray);
  } catch (error) {
    console.error(error.message);
    res.status(400).json({ status: "error", msg: "error getting users" });
  }
};

const register = async (req, res) => {
  try {
    const auth = await pool.query("SELECT * FROM users WHERE username = $1", [
      req.body.username,
    ]);
    if (auth.rowCount > 0) {
      return res.status(400).json({
        status: "error",
        msg: "This username has already been taken. Please choose another username.",
      });
    }
    const hash = await bcrypt.hash(req.body.password, 12);
    await pool.query(
      "INSERT INTO users (username, hash, role, created_at) VALUES ($1, $2, $3, NOW())",
      [req.body.username, hash, req.body.role || "user"]
    );
    res.json({ status: "ok", msg: "User created successfully." });
  } catch (error) {
    console.error(error.message);
    res.status(400).json({ status: "error", msg: "error registering" });
  }
};

const login = async (req, res) => {
  try {
    const auth = await pool.query("SELECT * FROM users WHERE username = $1", [
      req.body.username,
    ]);
    if (auth.rowCount === 0) {
      return res.status(400).json({
        status: "error",
        msg: "Username/Password is incorrect. Please try again.",
      });
    }
    const result = await bcrypt.compare(req.body.password, auth.rows[0].hash);
    if (!result) {
      console.error("username or password error");
      return res.status(401).json({
        status: "error",
        msg: "Username/Password is incorrect. Please try again",
      });
    }
    const claims = {
      username: auth.rows[0].username,
      role: auth.rows[0].role,
    };
    const access = jwt.sign(claims, process.env.ACCESS_SECRET, {
      expiresIn: "20m",
      jwtid: uuidv4(),
    });
    const refresh = jwt.sign(claims, process.env.REFRESH_SECRET, {
      expiresIn: "30d",
      jwtid: uuidv4(),
    });
    res.json({ access, refresh });
  } catch (error) {
    console.error(error.message);
    res.status(400).json({ status: "error", msg: "error login" });
  }
};

const refresh = async (req, res) => {
  try {
    const decoded = jwt.verify(req.body.refresh, process.env.REFRESH_SECRET);

    const claims = {
      username: decoded.username,
      role: decoded.role,
    };
    const access = jwt.sign(claims, process.env.ACCESS_SECRET, {
      expiresIn: "60m",
      jwtid: uuidv4(),
    });
    res.json({ access });
  } catch (error) {
    console.error(error.message);
    res.status(400).json({ status: "error", msg: "error refresh" });
  }
};

module.exports = { getAllUsers, register, login, refresh };
