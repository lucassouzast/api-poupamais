const mongoose = require("mongoose");

const entrySchema = new mongoose.Schema({
  description: { type: String },
  value: { type: Number, required: true },
  date: { type: Date, required: true },
  category: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Category",
    required: true
  },
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true
  }
});

module.exports = mongoose.model("Entry", entrySchema);
