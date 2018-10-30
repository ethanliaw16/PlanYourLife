var express = require('express');

router = express.Router();

router.post('/newquery', function(req, res){
  console.log('reached api layer on new query, ' + req.body);
  //code to send data to backend
  res.send('reached api layer on new query.');
});

router.get('/lists', function(req, res){
  console.log('reached api layer for list retrieval.');
  res.send(200,'successfully reached api layer');
}
module.exports = router;
