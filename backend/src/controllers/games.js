const Games = require("../models/Games");
const Favourites = require("../models/Favourites");

const getAllGames = async (req, res) => {
  try {
    const allGames = await Games.find();
    res.json(allGames);
  } catch (error) {
    console.error(error.message);
    res.json({ status: "error", msg: "error getting all games" });
  }
};

const getGameByUserPlaylist = async (req, res) => {
  try {
    const game = await Favourites.find({
      username: req.body.username,
    })
      .select("id")
      .select("slug")
      .select("name")
      .select("released")
      .select("background_image")
      .select("platforms")
      .select("short_screenshots")
      .select("genres")
      .select("parent_platforms")
      .select("status");
    res.json(game);
  } catch (error) {
    console.error(error.message);
    res.status(400).json({ status: "error", msg: "error getting game" });
  }
};

const getFavourites = async (req, res) => {
  try {
    const favourites = await Favourites.find();
    res.json(favourites);
  } catch (error) {
    console.error(error.message);
    res.json({ status: "error", msg: "error getting favourites" });
  }
};

const updateGame = async (req, res) => {
  try {
    // Use the $set operator to update only the specified fields
    await Favourites.findByIdAndUpdate(
      req.params.id,
      { $set: req.body },
      { new: true } // This option returns the updated document
    );
    res.json({ status: "ok", msg: "game updated" });
  } catch (error) {
    console.error(error.message);
    res.status(400).json({ status: "error", msg: "error updating game" });
  }
};

const removeGame = async (req, res) => {
  try {
    await Favourites.findByIdAndDelete(req.params.id);
    res.json({ status: "ok", msg: "game deleted" });
  } catch (error) {
    console.error(error.message);
    res.status(400).json({ status: "error", msg: "error deleting game" });
  }
};

module.exports = {
  getAllGames,
  getGameByUserPlaylist,
  getFavourites,
  updateGame,
  removeGame,
};
