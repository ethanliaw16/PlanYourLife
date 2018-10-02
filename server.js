var http = require('http');
var datetime = require('./myFirstModule');

http.createServer(function(req, res){
  res.writeHead(200, {'Content-Type' : 'text/html'});
  res.end('PlanYourLife');
}).listen(8080);
