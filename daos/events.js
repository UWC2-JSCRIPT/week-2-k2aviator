const Events = require('../models/events');
const Calendars = require('../models/calendars');

module.exports = {};

module.exports.create = async (name) => {
    if (name){
      return await Events.create(name)
    } else {
      res.status(400).send("No name provided")
    }
    ;
  };
  
 module.exports.getAll = (calendarID) => {
    // console.log("calendar id in dao file ",calendarID)
    return Events.find({"calendarId":calendarID});
  }
  

  module.exports.getById = async (id, calendarId) => {
    try {
      const event = await Events.findOne({ _id: id , calendarId : calendarId}).lean();
      return event;
    } catch (e) {
      return null;
    }
  };

  module.exports.create = async (calendarId, eventName, eventDate) => {
    try {
      // console.log("data in daos file is ", "id: ", calendarId, " | event name: " , eventName, " | event date: ", eventDate)
      const calendarInsert = await Calendars.findOne({ _id: calendarId }).lean();
      // console.log("calendar to insert into ", calendarInsert)
      const addedEvent = Events.create({calendarId: calendarId, name: eventName, date: eventDate})
      return addedEvent;
    } catch (e) {
      return null;
    }
  };


  module.exports.removeById = async (id) => {
    try {
      // console.log("daos file")
      // console.log("id to remove is ", id)
      const eventDeleted = await Events.deleteOne({ _id: id }).lean();
      return eventDeleted;
    } catch (e) {
      return null;
    }
  };
  

  module.exports.updateById = async (calendarId, eventId, eventName, eventDate) => {
    try {
      // console.log("dao file")
      const event = await Events.updateOne({_id: eventId, calendarId: calendarId}, {calendarId: calendarId, name: eventName, date:eventDate}).lean();
      const updatedEvent = await Events.findOne({_id: eventId, calendarId: calendarId}).lean()
      return updatedEvent;
    } catch (e) {
      return null;
    }
  };
  