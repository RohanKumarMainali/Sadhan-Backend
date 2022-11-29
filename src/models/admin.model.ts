import mongoose from "mongoose";

// create schema
const adminSchema = new mongoose.Schema({
    username: String,
    password: String
});

// create model and export
module.exports = new mongoose.Model("admins",adminSchema);