![JSONViewer Logo](https://raw.githubusercontent.com/tulios/json-viewer/master/logo.png)

# JSON Viewer

The most beautiful and customizable JSON/JSONP highlighter that your eyes have ever seen. It is a Chrome extension for printing JSON and JSONP.

Features:

* Syntax highlighting
* 21 built-in themes
* Collapsible nodes
* Clickable URLs
* URL does not matter
* Inspect your json typing "json" in the console
* Hot word `json-viewer` into omnibox
* Toggle button to view the raw/highlighted version
* Option to show line numbers
* Option to customize your theme
* Option to configure a max JSON size to highlight
* Option to collapse nodes from second level + Button to unfold all collapsed nodes
* Option to include a header with timestamp + url
* Option to allow the edition of the loaded JSON

Notes:

* This extension might crash with other JSON highlighters/formatters, you may need to disable them
* To highlight local files and incognito tabs you have to manually enable these options on the extensions page

## Installation

### Install through Chrome Web Store

[https://chrome.google.com/webstore/detail/json-viewer/gbmdgpbipfallnflgajpaliibnhdgobh](https://chrome.google.com/webstore/detail/json-viewer/gbmdgpbipfallnflgajpaliibnhdgobh)

### or compile and load by yourself

  1. it depends on node (version in `package.json` engines)
  2. `npm install`
  3. `npm run build`
  4. open Chrome and go to chrome://chrome/extensions/
  5. enable "Developer mode"
  6. click "Load unpacked extension"
  7. select "build/json_viewer" directory

## Try it on

### JSON

  [http://graph.facebook.com/github](http://graph.facebook.com/github)

  [https//api.github.com](https://api.github.com)

  [https://api.github.com/gists/public](https://api.github.com/gists/public)

  Large files:

  [https://raw.githubusercontent.com/ebrelsford/geojson-examples/master/596acres-02-18-2014.geojson](https://raw.githubusercontent.com/ebrelsford/geojson-examples/master/596acres-02-18-2014.geojson)

  [https://api.takealot.com/rest/v-1-4-2/productlines?available=1&cat=10371&instock=1&rows=10&sort=score%20desc&start=0](https://api.takealot.com/rest/v-1-4-2/productlines?available=1&cat=10371&instock=1&rows=10&sort=score%20desc&start=0)

### JSONP

  [http://freemusicarchive.org/api/get/curators.jsonp?api_key=60BLHNQCAOUFPIBZ&callback=test](http://freemusicarchive.org/api/get/curators.jsonp?api_key=60BLHNQCAOUFPIBZ&callback=test)
