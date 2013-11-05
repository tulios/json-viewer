# JSON Viewer

![logo](https://raw.github.com/tulios/json-viewer/master/logo.png)

The most beautiful and customizable JSON/JSONP highlighter that your eyes have ever seen.
It is a Chrome extension for printing JSON and JSONP.

## Themes

![okaidia](https://raw.github.com/tulios/json-viewer/master/extension/src/assets/image_themes/okaidia.png)
![coy](https://raw.github.com/tulios/json-viewer/master/extension/src/assets/image_themes/coy.png)
![tomorrow](https://raw.github.com/tulios/json-viewer/master/extension/src/assets/image_themes/tomorrow.png)

[and more!](https://github.com/tulios/json-viewer/wiki/Themes)


  Change the themes in the options page (window > extensions > JSON Viewer > Options)

## Installation

### Install through Chrome Web Store

[https://chrome.google.com/webstore/detail/json-viewer/gbmdgpbipfallnflgajpaliibnhdgobh](https://chrome.google.com/webstore/detail/json-viewer/gbmdgpbipfallnflgajpaliibnhdgobh)

### or compile and load by yourself

  1. it depends on ruby (preferable version 2.0.0-p247)
  2. gem install bundler
  3. bundle install
  4. rake build
  5. open Chrome and go to chrome://chrome/extensions/
  6. enable "Developer mode"
  7. click "Load unpacked extension"
  8. select "build/json_viewer" directory

## Try it on

### JSON

  [https//api.github.com](https://api.github.com)

  [https://api.github.com/gists/public](https://api.github.com/gists/public)

  [http://freemusicarchive.org/api/get/curators.json?api_key=60BLHNQCAOUFPIBZ](http://freemusicarchive.org/api/get/curators.jsonp?api_key=60BLHNQCAOUFPIBZ&callback=test)

### JSONP

  [http://freemusicarchive.org/api/get/curators.jsonp?api_key=60BLHNQCAOUFPIBZ&callback=test](http://freemusicarchive.org/api/get/curators.jsonp?api_key=60BLHNQCAOUFPIBZ&callback=test)
