var AWS = require('aws-sdk')
var Hapi = require('hapi');
var Good = require('good');

var server = new Hapi.Server(3000);

server.route({
  method: 'GET',
  path: '/',
  handler: function (request, reply) {
    reply('Hello, world!');
  }
});

function sendSqsMessage() {
  "use strict";

  var params = {
    MessageBody: "The Message Body Goes Here",
    QueueUrl: "https://sqs.us-west-2.amazonaws.com/588271471917/sample",
    DelaySeconds: 0
  };

  sqs.sendMessage(params, function (err, data) {
    if (err) {
      console.log(err, err.stack);
    } // an error occurred
    else {
      console.log('Victory, message sent for ' + encodeURIComponent(request.params.name) + '!');
    }
    ;
  });
}

server.route({
  method: 'GET',
  path: '/{name}',
  handler: function (request, reply) {
    sendSqsMessage(encodeURIComponent(request.params.name));
    reply('Hello, ' + encodeURIComponent(request.params.name) + '!');
  }
});

server.pack.register(Good, function (err) {
  if (err) {
    throw err; // something bad happened loading the plugin
  }

  server.start(function () {
    server.log('info', 'Server running at: ' + server.info.uri);
  });
});