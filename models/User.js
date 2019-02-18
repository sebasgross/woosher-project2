const mongoose = require('mongoose')
const Schema = mongoose.Schema
const PLM = require("passport-local-mongoose")

const userSchema = new Schema({

  name: {
    type: String,
    required: true,
  },

  lastName:{
    type: String,
    required: true,
  },

  address: String,
  email: String,

  isWoosher:{
    type: Boolean,
    default: false,
  },

  photoURL: {
    type: String,
    default: 'images/user',
  },

},{timestamps:true})

userSchema.plugin(PLM, {usernameField: 'email'})
module.exports = mongoose.model("User", userSchema)
