var express = require('express');

var queryhandler = require('../../src/ServerFunctions/QueryHandler')
router = express.Router();


router.post('/newquery', function(req, res){

  queryhandler.processQuery(req.body);
  res.send('reached api layer on new query.');
});

router.get('/lists', function(req, res){
  console.log('reached api layer for list retrieval.');
  res.send(200,'successfully reached api layer');
});

module.exports = router;
