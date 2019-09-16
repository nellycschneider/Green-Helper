const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const environmentSchema = new Schema({
  id: Number,
  facts: Array,
  sources: Array
});

const Environment = mongoose.model("Environment", environmentSchema);
module.exports = Environment;
