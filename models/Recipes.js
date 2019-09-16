// models/Recipes.js
const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const recipesSchema = new Schema({
  id: Number,
  title: String,
  description: String,
  image: String,
  prep_time: Number,
  cook_time: Number,
  ingredients: [{
    type: String
  }],
  instructions: [{
    type: String,
  }],
  video: String
});

const Recipes = mongoose.model("Recipes", recipesSchema);

module.exports = Recipes;