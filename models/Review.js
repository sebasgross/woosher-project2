const mongoose = require('mongoose')
const Schema = mongoose.Schema

const reviewSchema = new Schema ({

	user: {
		required: true,
		type: Schema.Types.ObjectId,
		ref: 'User',
	},

	woosher: {
		required: true,
		type: Schema.Types.ObjectId,
		ref: 'User',
	},

	reviewText: {
		required: true,
		type: String,
	},

	reviewStars: {
		required: true,
		type: Number,
		enum: [1,2,3,4,5],
		default: 5,
	},

},{timestamps:true})

module.exports = mongoose.model('Review', reviewSchema)