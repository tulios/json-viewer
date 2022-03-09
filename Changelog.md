# 0.18.1 - 2020-12-22

* Update viewer-custom.scss #267 (fix blank space)
* Fixed bug where non-JSON text/html pages were polluted #218
* showArraySize should default to false if undefined. #179
* Set window.json when formatting from scratch page #195
* Support for clickable relative paths #197
* Improve link anchor wrapping #204
* Enable for offline use. #189

# 0.18.0 - 2017-10-23

* Make clear this plugin is open source (PR #144)
* Support pages with multiple nodes (PR #150)
* Add option to display the array size, disabled by default (`showArraySize` PR #122)
* Support JSONP with spaces around (PR #157)
* Allow force highlight for oversized JSON (PR #168)
* Add option to wrap links with a link tag [<a/>] (PR #173)
* Bugfix: preserve spaces in plain strings (PR #175)
* Bugfix: Remove unnecessary limitations from package.json (issue #171)
* Bugfix: fix float point numbers (issues #167 #111)

# 0.17.0 - 2017-01-16

* Bugfix: check if all nodes are text nodes before the normalization when facing multiple nodes (issue #136)
* Add key map `shift-enter` to show the previous search result (PR #135 thanks to @benvan)

# 0.16.2 - 2017-01-14

* Bugfix: checkIfJson fails when chrome splits text nodes (PR #133 thanks to @benvan)
* Bug fix: quotes incorrectly parsed by wrapNumbers resulting in broken json (PR #134 thanks to @benvan)

# 0.16.1 - 2016-12-04

* Bugfix: Empty `<pre>` prepended to body when markup contained one text node with any whitespace character inside (issue #123)

# 0.16.0 - 2016-12-01

* Make the extension work if the content-type is text/html (PR #117)
* Included panda-syntax theme (issue #112)
* Updated CodeMirror (5.21.0)
* Always show fold/unfold button (issue #107)

# 0.15.0 - 2016-08-13

* Bugfix: fixed issue with wrapNumbers failing when string ends with backslash (PR #94)

# 0.14.1 - 2016-06-17

* Improved JSON check

# 0.14.0 - 2016-05-30

* Included UI to notify about content not highlighted due to oversize

# 0.13.1 - 2016-05-26

* Bugfix: The character `$` is special, to be used inside `replace` the regular expressions must be escaped with another `$` (issue #83)

# 0.13.0 - 2016-05-08

* Included dracula and dracula-custom theme (issue #82)
* Included mehdi theme (issue #81)
* Improved selection background for some themes
* Bugfix: disabled cursor when on readOnly (closes #74)
* Bugfix: doesn't load CSS when content is not JSON (closes #66)
* Bugfix: Custom search is changing values with the highlight marks (closes #48)

# 0.12.0 - 2016-04-11

* Option to disable auto highlight (issue #76)

# 0.11.1 - 2016-03-16

  * Bugfix: JSONP matcher matching agains wrong payload
  * Support for payloads with `for(;;);`, `while(1);` and `while(true);`

# 0.11.0 - 2016-02-27

  * Alert about JSON size above maxJsonSize (issue #62)
  * Option to disable clickable URLs (issue #63)

# 0.10.3 - 2015-09-06

  * Bugfix: default `indentCStyle: false`, it should have been since the beginning
  * Bugfix: read-only mode shouldn't allows paste (issue #54)

# 0.10.2 - 2015-08-10

  * Bugfix: array data that has a parentheses immediately adjacent to text throws an error

# 0.10.1 - 2015-08-08

  * Bugfix: highlight of JSONP callbacks which contains numbers

# 0.10.0 - 2015-08-08

  * Option to sort json by keys (thanks to @North101)
  * New theme (yeti)
  * Updated CodeMirror (now it preserves the last search query)
  * Included scratch pad, a new area which you can type/paste JSON and format indefinitely using a button or key shortcut. To access type json-viewer + TAB + scratch pad ENTER
  * Bugfix: Javascript NO-BREAK SPACE \u00a0 is converting to Â character (chrome canary)
  * Customizable tab size
  * Option for C-style braces and arrays
  * Handle JSONP returns that begin with a comment (thanks to @benhollander)

# 0.9.3 - 2015-07-14

  * Bugfix: fixed an issue where numbers with exponent were incorrectly parsed
  * Included description of "prependHeader" add-on
  * Included version number into options page

# 0.9.2 - 2015-07-05

  * Bugfix: fixed the problem with Number.MAX_VALUE in all scenarios, used solution proposed by @alexlopashev

# 0.9.1 - 2015-06-26

  * Bugfix: new versions of chrome (45.0.2442.0 canary (64-bit)) have changed the format of the value hold by `:before content`, using a safe approach to check the CSS load (many thanks to @Wideshanks)
  * Removed outline from settings page

# 0.9.0 - 2015-06-25

  * Increased loadCSS max wait to 2s
  * Enabled browser search on raw content
  * Bugfix: fixed an issue with Number.MAX_VALUE replace fix
  * Bugfix: allowing private and local networks with url-pattern
  * Sorted themes by darkness
  * New theme (material)
  * Better default font for snippets in options page (improved for windows users)
  * Better default font-family

# 0.8.5 - 2015-06-10

  * Fixed typos with "alwaysFold" and "alwaysRenderAllContent"

# 0.8.4 - 2015-06-10

  * Fixed a bug where the decoding to allow numbers bigger than Number.MAX_VALUE breaks JSON files without numbers

# 0.8.3 - 2015-06-09

  * Fixed numbers bigger than Number.MAX_VALUE being rounded
  * Included search (also by regex)
  * Included option to render all content and use the browser search

# 0.8.2 - 2015-06-08

  * Improved reliability of the code which migrates the old options to the new ones

# 0.8.1 - 2015-06-08

  * Fixed a long problem with UTF-8 Characters
  * Clickable URLs with a better matcher

# 0.8.0 - 2015-06-08

  * Rewritten
  * New logo
  * Based on CodeMirror (~10x more performance)
  * New themes (21 built-in)
  * Highlighted/raw toggle button
  * Clickable URLs
  * Line numbers (optional)
  * Accepts custom CSS
  * Button to unfold everything when alwaysFold true
  * Options to customize text wrap, gutters, etc
  * Removed clickable URLs. Just while I think in a better solution
  * Increased Max JSON size default from 200kb to 400kb
  * Included reset button to options page

# 0.7.2 - 2015-02-01

  * Allow nested JSONP's by https://github.com/bluec0re

# 0.7.1 - 2014-01-27

  * Fixed arrow state when using option "Always fold from second level"
  * Better arrow closed state

# 0.7.0 - 2014-01-03

  * Included the keyword 'json-viewer' into the Omnibox to highlight anonymous json content
  * Gear icon to options page is now 10% visible to helps users find it

# 0.6.0 - 2013-12-08

  * Added an easy way to access the options page

# 0.5.0 - 2013-12-01

  * Added arrows up/down in foldable code
  * Option to configure the font-size
  * Fixed a bug where content with tags inside was being omitted - ex: {"sldXml": "<UserStyle>#FF0000</UserStyle>"}

# 0.4.0 - 2013-11-05

  * Jellybeans theme by Thiago Pontes (https://github.com/thiagopnts)
  * Keep settings when switching themes by Thiago Pontes (https://github.com/thiagopnts)

# 0.3.0 - 2013-09-11

  * Collapsible nodes
  * Option to activate/deactivate nodes always collapsed (from 2º level)
  * Option to activate/deactivate the header (timestamp + url)

# 0.2.0 - 2013-09-07

  * Options page
  * Six more themes and the ability to change between them
  * bugfix: activate only on json/jsonp sources
  * Better json key parser
  * Max JSON size option (default: 200 kb)
  * Uses event page to process the highlight

# 0.1.0 - 2013-09-06

  * First release with one theme
