module.exports.processquery = processQuery;

var Kwi = require('./KeyWordIdentifier');
var CalendarEventInsert = require('../../../calendar/calendarCreateEvent');
var Task = require('../../../tasks/createTaskList');

function processQuery(query, res){
    console.log('Reached the query handler. ' + query.text);
    var response = Kwi.KWI(query.text);
    /*var frontendResponse = String.format('Result of Key word identifier on query: {0} {1} {2} {3} {4} {5} {6} {7} {8} {9} ',
    response.add,
    response.download,
    response.remind,
    response.remove,
    response.destination,
    response.item,
    response.time,
    response.where,
    response.event,
    response.duration);*/
    if(response.add == true) {
      
    }
    else if (response.remove == true) {

    }
    else if (response.download == true) {
      
    }
    else if (response.remind == true) {

    }
    //JSON.parse(response);
    //console.log(frontendResponse);
    
    /*var googleresponse = CalendarEventInsert.execute();
    var googleTaskResponse = Task.execute();
    res.send(frontendResponse);*/

  }

  String.format = function(format) {
    var args = Array.prototype.slice.call(arguments, 1);
    return format.replace(/{(\d+)}/g, function(match, number) {
      return typeof args[number] != 'undefined'
        ? args[number]
        : match
      ;
    });
  }
