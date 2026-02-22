const mongoose = require("mongoose");

const entrySchema = new mongoose.Schema({
  title: { type: String, required: true },
  value: { type: Number, required: true },
  date: { type: Date, required: true },
  details: { type: String, default: "" },
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
