var JSONP_HEADER_REGEX = [
  /\s*while\((1|true)\)\s*;?/,
  /\s*for\(;;\)\s*;?/
]
var JSONP_FOOTER_REGEX = /\}\);?\s*$/

function replaceWrapper(rawJSON) {
  return rawJSON
    .replace(JSONP_HEADER_REGEX[0], '')
    .replace(JSONP_HEADER_REGEX[1], '')
    .replace(/^[^{\[].+\({/, '{')
    .replace(JSONP_FOOTER_REGEX, '}');
}

function getWrapper (rawJSON) {
  var wrapper = { header: '', footer: '' };

  var a = rawJSON.match(JSONP_HEADER_REGEX[0]);
  if (a && a.length) {
    wrapper.header = a[0];
  }
  a = rawJSON.match(JSONP_HEADER_REGEX[1]);
  if (a && a.length) {
    wrapper.header = a[0];
  }
  a = rawJSON.match(/^[^{\[].+\({/);
  if (a && a.length) {
    wrapper.header = a[0];
  }

  b = rawJSON.match(JSONP_FOOTER_REGEX);
  if (b && b.length) {
    wrapper.footer = b[0];
  }

  return wrapper;
}

module.exports = {
  replaceWrapper: replaceWrapper,
  getWrapper: getWrapper
};
