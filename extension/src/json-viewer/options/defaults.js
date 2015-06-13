module.exports = {
  theme: "default",
  addons: {
    prependHeader: true,
    maxJsonSize: 400,
    alwaysFold: false,
    alwaysRenderAllContent: false
  },
  structure: {
    readOnly: true,
    lineNumbers: true,
    lineWrapping: true,
    foldGutter: true
  },
  style: [
    ".CodeMirror {",
    "  font-family: monaco, Consolas, Menlo, Courier, monospace;",
    "  font-size: 16px;",
    "}"
  ].join('\n')
}
