
import mongoose from "mongoose"

const userSchema = new mongoose.Schema({
    firstName: 'string',
    lastName: 'string',
    email: 'string',
    password: 'string',
})

module.exports = mongoose.model("users",userSchema)
