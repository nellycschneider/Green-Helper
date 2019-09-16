const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const animalSchema = new Schema({
  day: Number,
  name: String,
  url: String
});

const Animals = mongoose.model("Animals", animalSchema);
module.exports = Animals;
