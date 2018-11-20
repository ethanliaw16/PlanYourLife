module.exports.getEvents = getEvents;
var Calendar = require('./calendar');

var events;

function getEvents(req, res) {
    events = Calendar.execute();
    return {'events': events};
}