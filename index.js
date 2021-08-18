'use strict'

/**
 * hexo-minify
 * author: Lete114
 * version: 1.0.3
 */

hexo.config.minify = Object.assign({
  js: true,
  css: true,
  html: true
}, hexo.config.uglify)

hexo.extend.filter.register('after_render:js', require('./lib/filter').minifyJS)

hexo.extend.filter.register('after_render:css', require('./lib/filter').minifyCSS)

hexo.extend.filter.register('after_render:html', require('./lib/filter').minifyHTML)
