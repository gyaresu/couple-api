'use strict';

var Couple = require('../');
var assert = require('assert');
var nock = require('nock');

describe('couple-api', function() {

  describe('authenticate()', function() {

    it('should be a method', function() {
      var couple = new Couple();
      assert.equal(typeof couple, 'object');
      assert.equal(typeof couple.authenticate, 'function');
    });

    it('should return the error and response object on authentication failure', function(done) {

      var res = {
        'error': 'Login failed: Invalid Email',
        'details': {
          'error': 'Login failed: Invalid Email',
          'email': true
        }
      };

      var coupleAPI = nock('https://api-ssl.tenthbit.com', {
          reqheaders: {
            'x-juliet-ver': '1.70'
          }
        })
        .post('/authenticate', 'userID=jason%40example.com&secretKey=hunter2')
        .reply(401, res);

      var couple = new Couple();
      couple.authenticate('jason@example.com', 'hunter2', function(err, resObj) {
        assert.deepEqual(err, new Error('Login Failed: Invalid Email'));
        assert.deepEqual(resObj, res);
        coupleAPI.done();
        done();
      });
    });

    // it('should authenticate and return a response object', function(){
    //   //todo
    // });

  });

  describe('identify()', function() {

    it('should have an identify method', function() {
      var couple = new Couple();
      assert.equal(typeof couple, 'object');
      assert.equal(typeof couple.identify, 'function');
    });

    it('should error when not authenticated', function() {
      var couple = new Couple();
      assert.throws(function() {
          couple.identify();
        },
        /authenticate/
      );
    });

    it('should error when `authObject` has no `user`', function() {
      var couple = new Couple();
      couple.authObject = {};
      assert.throws(function() {
          couple.identify();
        },
        /authenticate/
      );
    });

    it('should error when `authObject` user has no `other`', function() {
      var couple = new Couple();
      couple.authObject = {
        user: {}
      };
      assert.throws(function() {
          couple.identify();
        },
        /authenticate/
      );
    });
  });
    // it('should identify the client', function() {
    //   //todo
    // });

  describe('download()', function() {

    it('should have a download method', function() {
      var couple = new Couple();
      assert.equal(typeof couple, 'object');
      assert.equal(typeof couple.download, 'function');
    });

  });
});
