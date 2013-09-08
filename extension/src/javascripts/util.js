function merge() {
  var obj = {}, i = 0, il = arguments.length, key;
  if (il === 0) {
    return obj;
  }

  for (; i < il; i++) {
    for (key in arguments[i]) {
      if (arguments[i].hasOwnProperty(key)) {
        obj[key] = arguments[i][key];
      }
    }
  }
  return obj;
}

function defaultOptions() {
  return {
    "theme": "default",
    "maxJsonSize": 200 // kbyte
  };    
}

function getOptions() {
  var options = JSON.parse(localStorage["options"] || "{}");
  return merge(defaultOptions(), options);
}
