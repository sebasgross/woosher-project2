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
            ref="User"
        },
        requestDate:{
            type: Date,
            required: true
        }
        
    }
)

module.exports = mongoose.model("Service", serviceSchema)