import { checkIfJson } from './json-viewer/check-if-json';

function onLoad() {
  checkIfJson(document.contentType, async (pre) => {
    const resolved = await Promise.all([
      import(/* webpackChunkName: "highlight-content" */ './viewer-styles'),
      import(/* webpackChunkName: "highlight-content" */ './json-viewer/highlight-content'),
    ]);
    const { highlightContent } = resolved[1];
    pre.hidden = true;
    highlightContent(pre);
  });
}

document.addEventListener("DOMContentLoaded", onLoad, false);
