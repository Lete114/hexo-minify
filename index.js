/**
 * hexo-minify
 * author: Lete114
 */

'use strict'

const { minifyJS, minifyCSS, minifyHTML, miniImage } = require('./lib/filter')

const defaultConfig = {
  preview: false,
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
  },
  image: {
    enable: true,
    svg: { enable: true, options: {} },
    jpg: { enable: true, options: {} },
    png: { enable: true, options: {} },
    gif: { enable: true, options: {} },
    webp: { enable: true, options: {} }
  },
  postcss: {
    enable: true,
    options: {
      overrideBrowserslist: ['> 1%', 'last 2 versions', 'not dead']
    }
  }
}

hexo.config.minify = Object.assign(defaultConfig, hexo.config.minify)

const isMinify = hexo.config.minify.preview || ['g', 'generate'].includes(hexo.env.cmd)

if (isMinify) {
  hexo.extend.filter.register('after_render:js', minifyJS)

  hexo.extend.filter.register('after_render:css', minifyCSS)

  hexo.extend.filter.register('after_render:html', minifyHTML)

  hexo.extend.filter.register('before_exit', miniImage)
}
