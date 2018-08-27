const makeDebug = require('debug');
const path = require('path');
const debug = makeDebug('@feathersjs/configuration');
const config = require('config');
const separator = path.sep;
const fs = require('fs');

function init (p) {
  return function () {
    let app = this;

    const convert = current => {
      const result = Array.isArray(current) ? [] : {};

      Object.keys(current).forEach(name => {
        let value = current[name];

        if (typeof value === 'object' && value !== null) {
          value = convert(value);
        }

        if (typeof value === 'string') {
          if (value.indexOf('\\') === 0) {
            value = value.replace('\\', '');
          } else {
            if (process.env[value]) {
              value = process.env[value];
            } else if (value.indexOf('.') === 0 || value.indexOf('..') === 0) {
              // Make relative paths absolute
              value = path.resolve(
                path.join(config.util.getEnv('NODE_CONFIG_DIR')),
                value.replace(/\//g, separator)
              );
            }
          }
        }

        result[name] = value;
      });

      return result;
    };

    let data = fs.readFileSync(p.path, 'utf8');
    const lines = data.split('\n');
    lines.forEach(item => {
      if (!process.env[item.split('=')[0]]) {
        require('dotenv').config({path: p.path});
      }
    });
    const env = config.util.getEnv('NODE_ENV');
    const conf = convert(config);
    debug(`Initializing configuration for ${env} environment`);

    if (!app || app === global) {
      return conf;
    }

    Object.keys(conf).forEach(name => {
      let value = conf[name];
      debug(`Setting ${name} configuration value to`, value);
      app.set(name, value);
    });
  };
}

module.exports = init;
module.exports.default = init;
