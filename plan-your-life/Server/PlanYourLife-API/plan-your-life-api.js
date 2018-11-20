var express = require('express');

var queryhandler = require('../../src/ServerFunctions/QueryHandler');
var listHandler = require('../../src/ServerFunctions/ListHandler');
router = express.Router();


router.post('/newquery', function(req, res){
  console.log('body at api layer: ' + req.body.text);
  queryhandler.processquery(req.body, res);
  console.log('response: ' + res);
  //res.send('reached api layer on new query. ' + res.body);
  });

router.get('/events', function(req, res){
  console.log('reached api layer for list retrieval.');
  var events = new Array();
  events = listHandler.getEvents();
  console.log('list of events: ' + events);
  res.send(events);
});

module.exports = router;
