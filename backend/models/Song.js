const mongoose = require("mongoose");

const songSchema = new mongoose.Schema({
    title: String,
    artist: String,
    language: String,
    genre: String,
    mood: String,
    image: String,
    audio: String
});

module.exports = mongoose.model("Song", songSchema);