'use strict'

/**
 * hexo-minify
 * author: Lete114
 * version: 1.1.0
 */

const defaultConfig = {
  js: { enable: true, options: {} },
  css: { enable: true, options: {} },
  html: {
    enable: true,
    options: {
      minifyJS: true, // Compressed JavaScript
      minifyCSS: true, // CSS Compressed
      removeComments: true, // Remove the comments
      collapseWhitespace: true, // Delete any extra space
      removeAttributeQuotes: true // Delete attribute quotes
    }
  }
}

hexo.config.minify = Object.assign(defaultConfig, hexo.config.minify)

hexo.extend.filter.register('after_render:js', require('./lib/filter').minifyJS)

hexo.extend.filter.register('after_render:css', require('./lib/filter').minifyCSS)

hexo.extend.filter.register('after_render:html', require('./lib/filter').minifyHTML)
