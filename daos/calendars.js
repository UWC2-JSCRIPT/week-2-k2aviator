const Calendars = require('../models/calendars');

module.exports = {};
  
module.exports.create = async (name) => {
  if (name){
    return await Calendars.create(name)
  } else {
    res.status(400).send("No name provided")
  }
  ;
};


module.exports.getAll = () => {
  return Calendars.find();
}


module.exports.getById = async (id) => {
  try {
    const calendar = await Calendars.findOne({ _id: id }).lean();
    return calendar;
  } catch (e) {
    return null;
  }
};



module.exports.updateById = async (id, newData) => {
  try {
    const calendar = await Calendars.findOneAndUpdate({ _id: id }, newData, { new: true }).lean();
    return calendar;
  } catch (e) {
    return null;
  }
};


module.exports.removeById = async (id) => {
  try {
    const calendar = await Calendars.deleteOne({ _id: id }).lean();
    return calendar;
  } catch (e) {
    return null;
  }
};
