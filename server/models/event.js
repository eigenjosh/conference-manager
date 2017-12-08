var models = require('../config/constants').models
let mongoose = require('mongoose')
let ObjectId = mongoose.Schema.ObjectId

/*{
  "name": "First Annual Horse Uber Conference",
  "description": "possibly the greatest idea ever",
  "venue": "Kentucky Derby Raceway",
  "address": "meh",
  "city": "meh",
  "state": "meh",
  "zip": "meh",
  "startDate": "meh",
  "endDate": "meh"
}
*/

var schema = new mongoose.Schema({
  name: { type: String, required: true },
  description: { type: String, required: true },
  venue: { type: String, required: true },
  address: { type: String, required: true },
  city: { type: String, required: true },
  state: { type: String, required: true },
  zip: { type: String, required: true },
  startDate: { type: String, required: true },
  endDate: { type: String, required: true },
  created: { type: Number, default: Date.now() },
  creatorId: {type: ObjectId, ref: models.user.name, required: true}
});

module.exports = mongoose.model(models.event.name, schema);