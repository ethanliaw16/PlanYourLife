var http = require('http');

var express = require('express')
var app = express()

http.createServer(function(req, res){
  console.log("Server initialized.");
  res.writeHead(200, {'Content-Type' : 'text/html'});
  res.end('PlanYourLife');

}).listen(8000);
