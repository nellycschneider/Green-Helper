// models/Recipes.js
const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const recipesSchema = new Schema({
  day: Number,
  title: String,
  description: String,
  image: String,
  prep_time: Number,
  cook_time: Number,
  total_time: Number,
  ingredients: Array,
  instructions: Array,
  url: String
});

const Recipes = mongoose.model("Recipes", recipesSchema);

module.exports = Recipes;
