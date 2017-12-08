var models = require('../config/constants').models
let mongoose = require('mongoose')
let ObjectId = mongoose.Schema.ObjectId

var schema = new mongoose.Schema({
	name: { type: String, required: true },
	description: { type: String, required: true },
	location: { type: String, required: true },
	date: { type: String, required: true },
	startTime: { type: String, required: true },
	endTime: { type: String, required: true },
	created: { type: Number, default: Date.now() },
	creatorId: { type: ObjectId, ref: models.user.name, required: true },
	eventId: { type: ObjectId, required: true },
	notes: { type: [String] },
	speakerId: { type: ObjectId },
	speakerName: { type: String },
	capacity: { type: Number }
});

module.exports = mongoose.model(models.activity.name, schema);