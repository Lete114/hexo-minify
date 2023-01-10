const { transformSync } = require('esbuild')

exports.esbuildMinifyCSS = (s, options) => transformSync(s, {
  ...options,
  loader: 'css',
  minify: true,
  minifySyntax: true,
  minifyIdentifiers: true,
  minifyWhitespace: true,
}).code