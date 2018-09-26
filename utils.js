var path = require('path');
var fs = require('fs');
var { promisify } = require('util');
var dir = './cache';

var existsAsync = promisify(fs.exists);
var writeFileAsync = promisify(fs.writeFile);
var readFileAsync = promisify(fs.readFile);

[
  './cache',
].forEach(dir=>{
  if (!fs.existsSync(dir)) {
    fs.mkdirSync(dir);
  }
});

function cacheJsonWrapper(fun) {
  let result = {};
  return async (key, ...args) => {
    if (result[key]) {
      return result[key];
    }
    let fullpath = path.join('cache', encodeURIComponent(key));
    if (!fullpath.endsWith('.json')) {
      fullpath += '.json';
    }
    try {
      if (await existsAsync(fullpath)) {
        result[key] = readFileAsync(fullpath);
        result[key] = JSON.parse(await result[key]);
        return result[key];
      }
    } catch (e) {
      console.warn(e);
    }
    result[key] = fun(...args);
    result[key] = await result[key];
    fs.writeFile(fullpath, JSON.stringify(result[key]), ()=>{});
    return result[key];
  };
}

function singletonWrapper(fun) {
  let result = null;
  return async () => {
    if (result) {
      return result;
    }
    result = fun();
    result = await result;
    return result;
  };
}


module.exports = {
  cacheJsonWrapper,
  singletonWrapper,
};
