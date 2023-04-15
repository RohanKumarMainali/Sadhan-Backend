import mongoose from "mongoose";

const category = new mongoose.Schema({
  name: { type: String, required: true },
  slug: { unique: true, type: String, required: true },
  parentId: { type: String },
  parentName: String,
  image: {
    public_id: String,
    url: String,
  },
  createdOn: Date,
});

module.exports = mongoose.model("category", category);
