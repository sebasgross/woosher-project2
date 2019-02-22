const mongoose = require('mongoose')
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
    location: {
      address:{
        type:String,
      },
      coordinates:[]
    },
    email: String,

    role:{
      type: String,
      enum:['WOOSHER','USUARIO'],
      default: 'USUARIO',
    },
    photoURL: {
      type: String,
      default: 'http://res.cloudinary.com/dpt8pbi8n/image/upload/v1550853621/user.png',
    },
    services: [
    ]

  } , {timestamps:true}
)




userSchema.plugin(PLM, {usernameField: 'email'})
module.exports = mongoose.model("User", userSchema)
