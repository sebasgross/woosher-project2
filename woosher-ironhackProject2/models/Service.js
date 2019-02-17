const Schema = require('mongoose').Schema

let serviceSchema = new Schema ({
	user: {
		type: Schema.Types.ObjectId,
		required: true,
	},
	woosher: {
		type: Schema.Types.ObjectId,
		required: true,
	},
	deliveryAddress: {
		required: true,
		type: //DEFINE TYPE BASED ON WHAT GOOGLE MAPS WILL DELIVER.

	}
},{timestamps: true})

module.exports = mongoose.model('Service', serviceSchema)