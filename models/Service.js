const mongoose = require('mongoose')
const Schema = mongoose.Schema

const serviceSchema = new Schema({

      user: {
        type: Schema.Types.ObjectId,
        ref: "User",
        required: {
          type: Boolean,
          default: true,
        },
      
      },
      username: String,

      // woosher: {
      //   type: Schema.Types.ObjectId,
      //   ref:"User",
      //   required: {
      //     type: Boolean,
      //     default: true,
      //   },
      // },
      airdry: Array,
      active: {
        type: Boolean,
        default: false,
      },

      addressFrom: {
        location: {
          type: String,
          default: 'Point',
        },
        // required: {
        //   type: Boolean,
        //   default: true,
        // },
        active: {
          type: Boolean,
          default: false,
        },
        coordinates: [],
      },
      woosher:{
        type: Schema.Types.ObjectId,
        ref: "User",
      },
      addressTo: {
        location:{
          type: String,
          default: 'Point'
        },
          active: {
            type: Boolean,
            default: false,
          },
          coordinates: [],
        },

      // requestDate: {
      //   type: Date,
      //   required: {
      //     type: Boolean,
      //     default: true,
      //   },
      // },

},{timestamps:true})


module.exports = mongoose.model("Service", serviceSchema)
