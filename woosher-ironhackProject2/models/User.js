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
    address:String,
    email: String,

    isWorker:{
      type: Boolean,
      default: null
    },
    photoURL: {
      type: String,
      default:
        'https://res.cloudinary.com/dpt8pbi8n/image/upload/v1550267245/kisspng-user-interface-design-computer-icons-default-stephen-salazar-photography-5b1462e1b19d70.1261504615280626897275.jpg',
    },

  } , {timestamps:true}
)

userSchema.plugin(PLM, { usernameField: 'email' })

module.exports = mongoose.model("User", userSchema)
