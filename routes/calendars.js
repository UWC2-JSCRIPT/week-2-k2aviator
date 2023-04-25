const { Router } = require("express");

const CalendarDAO = require('../daos/calendars');

const router = Router();

//Create
router.post("/", async(req,res, next) => {
    const calendar = req.body; 
    const calendarName = req.body.name
    if (!calendar || JSON.stringify(calendar) === '{}' ) {
      res.status(400).send('calendar is required');
    } else if (!calendarName) {
      res.status(400).send('calendar name is is required');
    } else {
      const savedCalendar = await CalendarDAO.create(calendar)
      res.json(savedCalendar)
    }
  });


router.get("/", async (req, res, next) => {
  try {
    const calendarList = await CalendarDAO.getAll();
    res.json(calendarList)
  } catch(e) {
    next(e);
  }
});



router.get("/:id", async (req, res, next) => {
  try {
    const calendar = await CalendarDAO.getById(req.params.id);
    if (calendar) {
      res.json(calendar);
    } else {
      res.sendStatus(404);
    }
  } catch(e) {
    next(e);
  }
});


router.put("/:id", async (req, res, next) => {
  const id = req.params.id;
  const name = req.body.name;
  // console.log(name)
  if (!name){
    // console.log("no name" , name)
    return res.status(400).send("no name present")
  } else {
    // console.log("name is present", name)
    const result =  await CalendarDAO.updateById(id, req.body);
    if (result == null) {
      // console.log("console log 404 - id not found")
      return res.status(404).send("ID not found")
    } else 
    {
      // console.log(result)
      return res.json(result)
    } 
  }

});


router.delete("/:id", async (req, res, next) => {
  try {
    const calendar = await CalendarDAO.removeById(req.params.id);
    if (calendar) {
      res.sendStatus(200);
    } else {
      res.sendStatus(404);
    }
  } catch(e) {
    next(e);
  }
});

module.exports = router;