/**
 * Created by adron on 9/24/14.
 * Description: Test to verify the SDK is installed and the 
 *	  security information is available for the SDK to use.
 */

var should = require ('should');
var AWS = require('aws-sdk'); 

describe ( 'When trying out this sample application in AWS you', function () {

  it ( 'should have an environment variable set for AWS_ACCESS_KEY_ID', function () {
  	process.env.AWS_ACCESS_KEY_ID.should.exist;
  });

  it ( 'should have an environment variables set for AWS_SECRET_KEY', function () {
  	process.env.AWS_SECRET_KEY.should.exist;
  })

  it ( 'should have the AWS SDK installed and constructable', function () {
  	AWS.should.exist;
  })

  it ( 'should have the AWS Access Key set in the AWS config', function () {
  	AWS.config.should.exist;
  })

  it ( 'should have be able to create an S3 bucket', function () {
  	var s3 = new AWS.S3();
  })

});

