module.exports.getEvents = getEvents;
var Calendar = require('./calendar');

var events;

function getEvents(req, res) {
    events = Calendar.getEvents();
    // events = await Calendar.getEvents();
    console.log('Events: ' + events);
    return events;
}