var should = require("should"),
  AWS = require("aws-sdk"),
  awsRegion = "us-west-2",
  sqs = {},
  Hapi = require('hapi'),
  Good = require('good');


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

  AWS.config.update({
    accessKeyId: process.env.AWS_ACCESS_KEY_ID,
    secretAccessKey: process.env.AWS_SECRET_KEY,
    region: awsRegion
  });
  sqs = new AWS.SQS();

  var params = {
    MessageBody: "The Message Body Goes Here",
    QueueUrl: "https://sqs.us-west-2.amazonaws.com/588271471917/a_sample",
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
    reply('Your message ' + encodeURIComponent(request.params.name) + ' has been sent to queue!');
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