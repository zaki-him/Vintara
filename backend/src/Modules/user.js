import mongoose from "mongoose";
import hashPassword from "../Middlewares/hashPassword.js";
import bcrypt from 'bcrypt'

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  email: {
    type: String,
    required: true,
    unique: true
  },
  password: {
    type: String,
    required: true,
    min: 8
  },
  role: {
    type: String,
    required: true,
    enum: ['user', 'admin'],
    default: 'user'
  },
  phone: {
    type: String
  },
  address: {
    type: String
  }
},{
  timestamps: true
})

userSchema.pre("save", hashPassword)

userSchema.methods.comparePassword = async function (password) {
  return bcrypt.compare(password, this.password)
}

const User = mongoose.model("User", userSchema)

export default User