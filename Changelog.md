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
