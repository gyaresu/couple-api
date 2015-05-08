'use strict';

var request = require('request');
    //fs = require('fs'),
    //moment = require('moment'),
    //Download = require('download');
    //path = require('path');

var JULIET_VER = '1.70'; // API version

exports = module.exports = Couple;

function Couple(options){
  this.options = options || {};
}

exports.version = JULIET_VER;

Couple.prototype.identify = function(){
  if(typeof this.authObject === 'undefined' || typeof this.authObject.user === 'undefined' || typeof this.authObject.user.other === 'undefined'){
    throw new Error('Must authenticated with Couple.');
  }
  return {
    userID: this.authObject.user.userID,
    authToken: this.authObject.authenticationToken,
    otherID: this.authObject.user.other.userID,
    apiHost: this.authObject.base,
    userHash: this.authObject.user.uuid,
    pairHash: this.authObject.user.pairID
  };
};

Couple.prototype.authenticate = function(email, password, callback){
  var instance = this;

  if(typeof email === 'undefined'){
    return callback(new Error('Email required to authenticate with Couple.'));
  }
  if(typeof password === 'undefined'){
    return callback(new Error('Password required to authenticate with Couple.'));
  }

  request(
    {
      uri: 'https://api-ssl.tenthbit.com/authenticate',
      method: 'POST',
      form: {
        userID: email,
        secretKey: password
      },
      headers: {
        'x-juliet-ver': JULIET_VER
      },
      gzip: true
    }, function (err, res, body) {
      if (err) {
        return callback(err);
      }
      var responseObject;
      try {
        responseObject = JSON.parse(String(body));
      }
      catch (err) {
        return callback(new Error('There is a problem with the Couple API: ' + err));
      }

      if(typeof responseObject.error !== 'undefined'){
        return callback(new Error(responseObject.error), responseObject);
      }

      instance.authObject = responseObject;
      return callback(null, instance);

    }
  );
};

Couple.prototype.download = function(type, callback) {
  /*
  var instance = this,
      ext,
      responseObject;

  function mkdirSync(path) {
    try {
      fs.mkdirSync('./private/' + path);
    } catch(e) {
      if ( e.code !== 'EEXIST' ) {
        throw e;
      }
    }
  }


  // Am I overthinking this request? I just want the JSON object

  request.get({
    uri: instance.authObject.base,
    method: 'GET',
    form: {
      authenticationToken:  instance.authObject.base.authenticationToken,
    }
  }), function (err, res, body) {
    if (err) {
      return callback(err);
    }
    try {
      responseObject = JSON.parse(String(body));
    }
    catch (err) {
      return callback(new Error('There is a problem with the Couple API: ' + err));
    }

    if(typeof responseObject.error !== 'undefined'){
      return responseObject;
    }
  };

  var items = data.filter(function(each) {
      return each.mediaType == type && each.file;
  });

  mkdirSync(type); // create folders but don't write over existing

  switch (type) {
      case 'video':
          ext = '.mov';
          break;
      case 'image':
          ext = '.jpg';
          break;
      case 'text':
          ext = '.txt';
          break;
      default:
          ext = '';
  }


  for (var i = 0; i < items.length -1; ++i) {
      //var name = items[i];
      var dld = new Download();

      //if (items[i].from == 'me@example.com')
      //    name = 'Alice';
      //else
      //    name = 'Bob';

      if (ext === '.jpg' || ext === '.mov')
          dld
              .get(items[i].file)
              .dest('./private/' + type)
              .rename(moment(items[i].timeStamp).format() + '-' + items[i].from + ext)
              .run(function(err) {
                  console.log(items[i].file, " has completed downloading.");
              });

      else if (ext === '.txt')
          return "Not doing text files yet";
  }
  */
  return callback(console.log('Downloads succesful for ', this.authObject.user.userName));
};
