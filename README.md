# @feathersjs/configuration

> A small configuration module for your Feathers application.

## About

`@feathersjs/configuration` is a module that wraps [node-config](https://github.com/lorenwest/node-config) to configure your Feathers application.

> npm install @feathersjs/configuration

```js
const feathers = require('@feathersjs/feathers');
const configuration = require('@feathersjs/configuration');

// Use the application root and `config/` as the configuration folder
let app = feathers().configure(configuration([
  // five a list of environments names to search in a .env file...
  'HOST',
  ...
]))
```

setup your `config/*.json` file:

```json
{
  "host": "HOST"
}
```

See the [Feathers configuration docs](https://docs.feathersjs.com/api/configuration.html) for the full API usage.

## License

Copyright (c) 2018

Licensed under the [MIT license](LICENSE).
