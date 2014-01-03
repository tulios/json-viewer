//= require_self

chrome.omnibox.onInputChanged.addListener(function(text, suggest) {
  console.log('inputChanged: ' + text);
  suggest([
    {content: "Format JSON", description: "Open a page with json highlighted"}
  ]);
});

chrome.omnibox.onInputEntered.addListener(function(text) {
  chrome.tabs.query({active: true, currentWindow: true}, function(tabs) {
    var url = chrome.extension.getURL("/pages/json-container.html") + "?json=" + encodeURIComponent(text);
    chrome.tabs.update(tabs[0].id, {url: url});
  });
});
