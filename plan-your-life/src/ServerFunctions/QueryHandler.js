module.exports.processquery = processQuery;

var Kwi = require('./KeyWordIdentifier');
var CalendarEventInsert = require('./CalendarEventInsert');

function processQuery(query, res){
    console.log('Reached the query handler. ' + query.text);
    var response = Kwi.KWI(query.text);
    //JSON.parse(response);
    console.log(String.format('Result of Key word identifier on query: {0} {1} {2} {3} {4} {5} {6} {7} {8} {9} ',
     response.add,
     response.download,
     response.remind,
     response.remove,
     response.destination,
     response.item,
     response.time,
     response.where,
     response.event,
     response.duration));

    var googleresponse = CalendarEventInsert.execute();
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
