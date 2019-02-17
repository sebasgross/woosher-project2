const mongoose = require("mongoose")
const Schema = mongoose.Schema
const PLM = require("passport-local-mongoose")

const userSchema = new Schema(
  {
    name: {
      type: String,
      required: true
    },
    lastName:{
      type: String,
      required: true
    },
    address: {
      type:String,
      required: true,
    },
    email: String,

    isWorker:{
      type: Boolean,
      default: false,
    },
    photoURL: {
      type: String,
      default: '',
    },

  } , {timestamps:true}
)

userSchema.plugin(PLM, { usernameField: 'email' })

module.exports = mongoose.model("User", userSchema)
