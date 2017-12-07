var models = require('../config/constants').models
let mongoose = require('mongoose')
let ObjectId = mongoose.Schema.ObjectId

var schema = new mongoose.Schema({
  description: { type: String, required: true },
  creatorId: {type: ObjectId, ref: models.user.name, required: true},
  eventId: { type: ObjectId },
  activityId: { type: ObjectId }
});

module.exports = mongoose.model(models.note.name, schema);