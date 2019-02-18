const mongoose = require("mongoose")
const Schema = mongoose.Schema

const serviceSchema = new Schema({

      user: {
        type: Schema.Types.ObjectId,
        ref: "User",
      },

      worker: {
        type: Schema.Types.ObjectId,
        ref:"User",
      },
      airdry: Array,
      active: {
        type: Boolean,
        default: true,
      },

      addressFrom: {
        location: {
          type: String,
          default: 'Point',
        },
        coordinates:[]
        },

      addressWoosher: {
          location: {
            type: String,
            default: 'Point',
          },
          coordinates:[]
          },
      requestDate: {
        type: Date,
        // required: true,
      }

},{timestamps:true})


module.exports = mongoose.model("Service", serviceSchema)
