![JSONViewer Logo](https://raw.githubusercontent.com/tulios/json-viewer/master/logo.png)

# JSON Viewer

![screenshot](https://raw.githubusercontent.com/tulios/json-viewer/master/screenshot.png)

The most beautiful and customizable JSON/JSONP highlighter that your eyes have ever seen. It is a Chrome extension for printing JSON and JSONP.

Notes:

* This extension might crash with other JSON highlighters/formatters, you may need to disable them
* To highlight local files and incognito tabs you have to manually enable these options on the extensions page
* Sometimes when the plugin updates chrome leaves the old background process running and revokes some options, like the access to local files. When this happen just recheck the option that everything will work again
* Works on local files (if you enable this in chrome://extensions)

Features:

* Syntax highlighting
* 27 built-in themes
* Collapsible nodes
* Clickable URLs (optional)
* URL does not matter (the content is analysed to determine if its a JSON or not)
* Inspect your json typing "json" in the console
* Hot word `json-viewer` into omnibox (type `json-viewer` + TAB and paste your JSON into omnibox, hit ENTER and it will be highlighted)
* Toggle button to view the raw/highlighted version
* Works with numbers bigger than Number.MAX_VALUE
* Option to show line numbers
* Option to customize your theme
* Option to customize the tab size
* Option to configure a max JSON size to highlight
* Option to collapse nodes from second level + Button to unfold all collapsed nodes
* Option to include a header with timestamp + url
* Option to allow the edition of the loaded JSON
* Option to sort json by keys
* Option to disable auto highlight
* Option for C-style braces and arrays
* Scratch pad, a new area which you can type/paste JSON and format indefinitely using a button or key shortcut. To access type `json-viewer` + `TAB` + `scratch pad` ENTER

## Installation

### Install through Chrome Web Store

[![https://chrome.google.com/webstore/detail/json-viewer/gbmdgpbipfallnflgajpaliibnhdgobh](https://raw.githubusercontent.com/tulios/json-viewer/master/tryitnow.png)](https://chrome.google.com/webstore/detail/json-viewer/gbmdgpbipfallnflgajpaliibnhdgobh)

### Or compile and load by yourself

  1. It depends on node (version in `package.json` engines).
  2. `npm install --global yarn`
  2. `yarn install`
  3. `yarn run build`
  4. Open Chrome and go to: chrome://extensions/
  5. Enable: "Developer mode"
  6. Click: "Load unpacked extension"
  7. Select: "build/json_viewer" directory.

## Try it on

### JSON

  [https://api.github.com/repos/tulios/json-viewer](https://api.github.com/repos/tulios/json-viewer)

  [http://graph.facebook.com/github](http://graph.facebook.com/github)

  [https//api.github.com](https://api.github.com)

  [https://api.github.com/gists/public](https://api.github.com/gists/public)

  Large files:

  [https://raw.githubusercontent.com/ebrelsford/geojson-examples/master/596acres-02-18-2014.geojson](https://raw.githubusercontent.com/ebrelsford/geojson-examples/master/596acres-02-18-2014.geojson)

  [https://api.takealot.com/rest/v-1-4-2/productlines?available=1&cat=10371&instock=1&rows=10&sort=score%20desc&start=0](https://api.takealot.com/rest/v-1-4-2/productlines?available=1&cat=10371&instock=1&rows=10&sort=score%20desc&start=0)

### JSONP

  [http://freemusicarchive.org/api/get/curators.jsonp?api_key=60BLHNQCAOUFPIBZ&callback=test](http://freemusicarchive.org/api/get/curators.jsonp?api_key=60BLHNQCAOUFPIBZ&callback=test)

## License

See [LICENSE](https://github.com/tulios/json-viewer/blob/master/LICENSE) for more details.
