module.exports.processquery = processQuery;

var Kwi = require('./KeyWordIdentifier');
var CalendarEventInsert = require('../../calendar/calendarCreateEvent');
//var CalendarEventRemove = require('../../calendar/calendarDeleteEvent');
//var CalendarListIds = require('../../calendar/calendarListIds');

//var Task = require('../../tasks/createTaskList');

function processQuery(query, res){
    console.log('Reached the query handler. ' + query.text);
    var response = Kwi.KWI(query.text);
    var frontendResponse = String.format('Result of Key word identifier on query: \n add {0}\ndownload {1}\nremind {2}\nremove {3}\ndestination {4}\nitem {5}\ntime {6}\nwhere {7}\nevent {8}\nduration {9} ',
    response.add,
    response.download,
    response.remind,
    response.remove,
    response.destination,
    response.item,
    response.time,
    response.where,
    response.event,
    response.duration);
    console.log(frontendResponse);
    console.log(response.time);
    var formattedDate = formatDateForGoogle(response.time);
    console.log(formattedDate);
    if(response.add == 'true') {
      console.log('Adding event ');
      var location = response.where;
      var startTime = formattedDate;
      var summary = response.item;
      var endTime = formattedDate;
      var eventObject = {'summary': summary,
      'location': location,
      'description': 'Event added by PlanYourLife',
      'start': {'dateTime': startTime, 'timeZone': 'America/New_York'},
      'end': {'dateTime': endTime, 'timeZone': 'America/New_York'}
      };

      CalendarEventInsert.execute(eventObject);
      console.log('event insert executed.');
    }
    else if (response.remove == 'true') {

    }
    else if (response.download == 'true') {
      
    }
    else if (response.remind == 'true') {

    }
    //JSON.parse(response);
    //console.log(frontendResponse);
    
    /*var googleresponse = CalendarEventInsert.execute();
    var googleTaskResponse = Task.execute();
    res.send(frontendResponse);*/
    console.log('end of query handler');
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

  function formatDateForGoogle(date){
    var fullDateForGoogle = new Date(date);
    /*console.log(fullDateForGoogle);
    var year = fullDateForGoogle.getFullYear;
    var month = addLeadingZero(fullDateForGoogle.getMonth); 
    var day = addLeadingZero(fullDateForGoogle.getDate);
    var hour = addLeadingZero(fullDateForGoogle.getHours); 
    var minutes = addLeadingZero(fullDateForGoogle.getMinutes); 
    var seconds = addLeadingZero(fullDateForGoogle.getSeconds);*/
    return fullDateForGoogle;//String.format('{0}-{1}-{2}T{3}:{4}:{5}-07:00', year, month, day, hour, minutes, seconds);
    
    //2015-05-28T17:00:00-07:00
  }

  function addLeadingZero(num) {
    var returnNum = num;
    if (num < 10) {
      returnNum = String.format('0{0}', num);
    }
    return returnNum;
  }
