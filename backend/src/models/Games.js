const mongoose = require("mongoose");

const GamesSchema = new mongoose.Schema(
  {
    id: { type: Number },
    slug: { type: String },
    name: { type: String },
    released: { type: String },
    tba: { type: String },
    background_image: { type: String },
    rating: { type: Array },
    rating_top: { type: Number },
    ratings: { type: Array },
    ratings_count: { type: String },
    reviews_text_count: { type: Number },
    added: { type: Number },
    added_by_status_yet: { type: Number },
    added_by_status_owned: { type: String },
    added_by_status_beaten: { type: Number },
    added_by_status_toplay: { type: Number },
    added_by_status_dropped: { type: Number },
    added_by_status_playing: { type: String },
    metacritic: { type: Number },
    playtime: { type: Number },
    suggestions_count: { type: Number },
    updated: { type: String },
    reviews_count: { type: Number },
    saturated_color: { type: String },
    dominant_color: { type: String },
    platforms: { type: Array },
    parent_platforms: { type: Array },
    genres: { type: Array },
    stores: { type: Array },
    tags: { type: Array },
    esrb_rating_id: { type: Number },
    esrb_rating_name: { type: Number },
    esrb_rating_slug: { type: Number },
    short_screenshots: { type: Array },
  },
  { collection: "games" }
);

module.exports = mongoose.model("Games", GamesSchema);
