const { transformSync } = require('esbuild')

exports.esbuildMinifyCSS = (s, options) => transformSync(s, {
  ...options,
  loader: 'css',
  minify: true
}).code