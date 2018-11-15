module.exports.processquery = processQuery;

var Kwi = require('./KeyWordIdentifier');
var CalendarEventInsert = require('./CalendarEventInsert');

function processQuery(query, res){
    console.log('Reached the query handler. ' + query.text);
    var response = Kwi.KWI(query.text);
    console.log('Result of Key word identifier on query: ' + response);

    var googleresponse = CalendarEventInsert.execute();
  }
