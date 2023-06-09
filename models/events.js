const mongoose = require('mongoose');

const eventSchema = new mongoose.Schema({
  name: { type: String, required: true },
  date: { type: Date, requried: true},
  calendarId: {type: mongoose.Types.ObjectId}
});


module.exports = mongoose.model("events", eventSchema);