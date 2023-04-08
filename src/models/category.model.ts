import mongoose from "mongoose";

const category = new mongoose.Schema({
  name: { type: String, required: true },
  slug: { unique: true, type: String, required: true },
  parentId: { type: String },
  image: {
    public_id: String,
    url: String,
  },
});

module.exports = mongoose.model("category", category);
