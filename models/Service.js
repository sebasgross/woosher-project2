const mongoose = require("mongoose")
const Schema = mongoose.Schema

const serviceSchema = new Schema(
    {
        user:{
                type: Schema.Types.ObjectId,
                ref: "User"
            },
        
        worker:{
            type: Schema.Types.ObjectId,
            ref:"User"
        },
        active:{
            type: Boolean,
            default: false
        },
        addressFrom: {
            location: {
              type: Schema.Types.ObjectId,
              ref: 'User',
            },
            coordinates: []
          },
          addressFrom:{
            location: {
                type: Schema.Types.ObjectId,
                ref: 'User',
              },
              coordinatesTo: []     
          },
        requestDate:{
            type: Date,
            required: true
        }
        
    } , {timestamps: true}
)

module.exports = mongoose.model("Service", serviceSchema)
