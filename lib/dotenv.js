const path = require('path');
const fs = require('fs');

const checkDotenv = function(envs) {
  return new Promise(function(resolve, reject) {
    let _dotenv = false;
    envs.forEach(function(item){
      _dotenv = _dotenv || process.env[item];
    });
    if (!_dotenv) {
      require('dotenv').config();
    }
    envs.forEach(function(item) {
      if(!process.env[item]) reject(new Error('Error on setting environment '+item));
    });
    resolve(_dotenv);  
  });
};

module.exports = function(app, envs){
  return checkDotenv(envs);
};
