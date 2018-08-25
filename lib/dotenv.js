const path = require('path');
const fs = require('fs');

const checkDotenv = function(envs, fn) {
  return Promise.all(Object.keys(envs).map(name => {
    return new Promise(function(resolve, reject) {
      fs.readFile(path.join(process.cwd(), name), function(err, data){
        if(err) reject(err);
        const lines = data.split('\n');
        const dict = item.split("=");
        Promise.all(lines.map(item => {
          return fn({ 
            name: dict[0],
            lowerCase: dict[0].map(c => {
              return c.toLowerCase();
            }),
            value: dict[1]
          })
        })).then(function(results){
          resolve(results);
        }).catch(reject);
      });
    })
  }));
}


module.exports = function(envs, fn){
  return checkDotenv(envs, fn);
};
