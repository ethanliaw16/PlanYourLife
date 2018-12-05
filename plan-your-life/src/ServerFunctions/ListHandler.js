module.exports.getEvents = getEvents;
var Calendar = require('./calendar');

var events;

function getEvents(req, res) {
    events = await Calendar.getEvents();
    console.log('Events: ' + events);
    return events;
}