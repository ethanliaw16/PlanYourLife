module.exports.getEvents = getEvents;
var CalendarListIds = require('../../calendar/calendarListIds');

var events;

function getEvents(req, res) {
    CalendarListIds.execute();
    res.send({'message': 'Events retrieved.'});
}