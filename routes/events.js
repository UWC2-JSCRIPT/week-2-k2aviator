const { Router } = require("express");

const EventsDAO = require('../daos/events');
const CalendarDAO = require('../daos/calendars');


const router = Router({ mergeParams: true });

router.get("/", async (req, res, next) => {
    
    try {
        const calendarID = req.params.calendarId
        // console.log("request calendar id is", calendarID )
        const calendarExists = await CalendarDAO.getById(calendarID);
        // console.log("calendar exists? ", calendarExists)
        if (!calendarExists){
            // console.log("no calendar matches")
            res.sendStatus(404).send('no calendar matches');
        } else {
            // console.log("show request paramaters ", req.params)
            const eventsList = await EventsDAO.getAll(calendarID);
            // console.log("return events list from find ", eventsList)
            res.json(eventsList)
            res.sendStatus(200);
        }
    } catch(e) {
        next(e);
    }
});



router.get("/:id", async (req, res, next) => {
    try {
        const calendarID = req.params.calendarId
        const eventId = req.params.id
        //console.log("request calendar id is", calendarID )
        // console.log("event id is", eventId)
        const calendar = await CalendarDAO.getById(calendarID);
        // console.log("calendar exists? ", calendarExists)
      if (!calendar) {
        // console.log("no calendar matches")
        res.sendStatus(404).send('no calendar matches');
      } else {
        const event = await EventsDAO.getById(eventId, calendarID);
            if (!event){
            res.sendStatus(404)
            } else {
            res.json(event)
            res.sendStatus(200);}
      }
    } catch(e) {
      next(e);
    }
 });
  


 router.post("/", async (req, res, next) => {
  try {
      const reqParams = req.params
      const reqBody = req.body
      const calendarID = req.params.calendarId
      // console.log("request body is ", req.body)
      // console.log("request calendar id is", calendarID )
      // console.log("request params are ", req.params)
      const calendar = await CalendarDAO.getById(calendarID);
    if (!calendar) {
      // console.log("no calendar matches")
      res.sendStatus(404).send('no calendar matches');
    } else {
      // console.log("calendar id matches, now check name and date fields")
      const eventName = reqBody.name;
      const eventDate = reqBody.date;
      if (!eventName || !eventDate){
        // console.log("skip... no event name: ", eventName, " or no event date ", eventDate)
        res.sendStatus(400).send('check name or date fields');
      } else {
        // console.log("add event with event name ", eventName, " and event date ",  eventDate)
        const createdEvent = await EventsDAO.create(calendarID, eventName, eventDate)
        // console.log("created event is ", createdEvent)
        res.json(createdEvent)
        res.sendStatus(400)
      }
    }
  } catch(e) {
    next(e);
  }
});


router.delete("/:id", async (req, res, next) => {
  try {
      const eventId = req.params.id;
      const calendarId = req.params.calendarId;
      // console.log("request params are ", req.params)
      // console.log("event id to delete is ", eventId, " calendar id to delete is ", calendarId );
      const calendar = await CalendarDAO.getById(calendarId);
    if (!calendar) {
      // console.log("no calendar matches")
      res.sendStatus(404).send('no calendar matches');
    } else {
      // console.log("calendar id matches, now check name and date fields")
      const event = await EventsDAO.getById(eventId, calendarId);
      if (!event){
        // console.log("event id does not match")
        res.sendStatus(404)
      } else {
        // console.log("event id matches, now delete")
        const eventDeleted = await EventsDAO.removeById(eventId)
        res.json(eventDeleted)
        res.sendStatus(200);}
      }
  } catch(e) {
    next(e);
  }
});

router.put("/:id", async (req, res, next) => {
  try {
      const eventId = req.params.id;
      const calendarId = req.params.calendarId;
      const requestBody = req.body;
      // console.log("request body is ", requestBody)
      // console.log("request params are ", req.params)
      // console.log("event id to update is ", eventId, " calendar id to match is ", calendarId );
      const calendar = await CalendarDAO.getById(calendarId);
      if (!calendar) {
        // console.log("no calendar matches")
        res.sendStatus(404).send('no calendar matches');
      } else {
        // console.log("calendar id matches, now check name and date fields")
        const eventCalendarId = requestBody.calendarId;
        const eventName = requestBody.name;
        const eventDate = requestBody.date;
        // console.log("event calendar id is ", eventCalendarId, " calendar id is ", calendarId)
        if (!eventName || !eventDate){
          // console.log("skip... no event name: ", eventName, " or no event date ", eventDate)
          res.sendStatus(400).send('no name or date fields');
        } else {
          // console.log("add event with event name ", eventName, " and event date ",  eventDate, " event id is ", eventId)
          const updatedEvent = await EventsDAO.updateById(calendarId, eventId, eventName, eventDate)
          // console.log("updated event is ", updatedEvent)
          if (!updatedEvent){
            res.sendStatus(404)
          } else {

            res.json(updatedEvent)
          }
        }
      } 
  } catch(e) {
    next(e);
  }
    
});

module.exports = router;

