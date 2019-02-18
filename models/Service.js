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

      worker: {
        type: Schema.Types.ObjectId,
        ref:"User",
        required: {
          type: Boolean,
          default: true,
        },
      },

      active: {
        type: Boolean,
        default: false,
      },

      addressUser: {
        location: {
          type: Schema.Types.ObjectId,
          ref: 'User',
        },
        required: {
          type: Boolean,
          default: true,
        },
        active: {
          type: Boolean,
          default: true,
        },
        coordinates: [],
      },

      addressWoosher: {
        location: {
          type: Schema.Types.ObjectId,
          ref: 'User',
        },
        active: {
          type: Boolean,
          default: false,
        },
        coordinatesTo: [],
      },

      requestDate: {
        type: Date,
        required: {
          type: Boolean,
          default: true,
        },
      },

},{timestamps:true})

module.exports = mongoose.model("Service", serviceSchema)
