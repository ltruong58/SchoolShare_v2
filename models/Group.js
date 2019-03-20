const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// Create Schema
const GroupSchema = new Schema({
	creator: {
		type: Schema.Types.ObjectId,
		ref: 'users'
	},
	title: {
		type: String,
		required: true
	},
	description: {
		type: String,
		default: ""
	},
	inviteCode: {
		type: String,
		required: true,
		unique: true
	},
	date: {
		type: Date,
		default: Date.now
	}
});

module.exports = Profile = mongoose.model('group', GroupSchema);
