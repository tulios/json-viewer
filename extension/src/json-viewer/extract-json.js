var JSONP_HEADER_REGEX = new RegExp([
  '(\\s*while\\((1|true)\\)\\s*;?)',
  '(\\s*for\\(;;\\)\\s*;?)',
  '(^[^{\\[].+?\\()'
].join('|'))

var JSONP_FOOTER_REGEX = /\);?\s*$/

function replaceWrapper(rawJsonString) {
  return rawJsonString
    .replace(JSONP_HEADER_REGEX, '')
    .replace(JSONP_FOOTER_REGEX, '')
}

function getWrapper (rawJsonString) {
  var wrapper = { header: '', footer: '' };

  var header = rawJsonString.match(JSONP_HEADER_REGEX)
  wrapper.header = header ? header[0] : ''

  var footer = rawJsonString.match(JSONP_FOOTER_REGEX)
  wrapper.footer = footer ? footer[0] : ''

  return wrapper;
}

module.exports = {
  replaceWrapper: replaceWrapper,
  getWrapper: getWrapper
};
