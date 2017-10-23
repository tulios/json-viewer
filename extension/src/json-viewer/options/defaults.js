module.exports = {
  theme: "default",
  addons: {
    prependHeader: true,
    maxJsonSize: 400,
    alwaysFold: false,
    alwaysRenderAllContent: false,
    sortKeys: false,
    clickableUrls: true,
    wrapLinkWithAnchorTag: false,
    openLinksInNewWindow: true,
    autoHighlight: true
  },
  structure: {
    readOnly: true,
    lineNumbers: true,
    lineWrapping: true,
    foldGutter: true,
    tabSize: 2,
    indentCStyle: false,
    showArraySize: false
  },
  style: [
    ".CodeMirror {",
    "  font-family: monaco, Consolas, Menlo, Courier, monospace;",
    "  font-size: 16px;",
    "  line-height: 1.5em;",
    "}"
  ].join('\n')
}
