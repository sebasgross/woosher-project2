const mongoose = require('mongoose')
const Schema = mongoose.Schema

const reviewSchema = new Schema ({

	user: {
		required: {
			type: Boolean,
			default: true,
		},
		type: Schema.Types.ObjectId,
		ref: 'User',
	},

	woosher: {
		required: {
			type: Boolean,
			default: true,
		},
		type: Schema.Types.ObjectId,
		ref: 'User',
	},

	reviewText: {
		required: {
			type: Boolean,
			default: true,
		},
		type: String,
	},

	reviewStars: {
		required: {
			type: Boolean,
			default: true,
		},
		type: Number,
		enum: [1,2,3,4,5],
		default: 5,
	},

},{timestamps:true})

module.exports = mongoose.model('Review', reviewSchema)