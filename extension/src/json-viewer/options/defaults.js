module.exports = {
  theme: "default",
  addons: {
    prependHeader: true,
    maxJsonSize: 400,
    awaysFold: false,
    awaysRenderAllContent: false
  },
  structure: {
    readOnly: true,
    lineNumbers: true,
    lineWrapping: true,
    foldGutter: true
  },
  style: [
    ".CodeMirror {",
    "  font-family: monaco, Arial, sans-serif;",
    "  font-size: 16px;",
    "}"
  ].join('\n')
}
