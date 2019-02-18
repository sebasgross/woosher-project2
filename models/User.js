const mongoose = require('mongoose')
const Schema = mongoose.Schema
const PLM = require("passport-local-mongoose")

const userSchema = new Schema({

  name: {
    type: String,
    required: {
      type: Boolean,
      default: true,
    },
  },

  lastName:{
    type: String,
    required: {
      type: Boolean,
      default: true,
    },
  },

  address: String,
  email: String,

  isWoosher:{
    type: Boolean,
    default: false,
  },

  photoURL: {
    type: String,
    required: {
      type: Boolean,
      default: false,
    },
    default: 'images/user',
  },

},{timestamps:true})

userSchema.plugin(PLM, {usernameField: 'email'})
module.exports = mongoose.model("User", userSchema)
