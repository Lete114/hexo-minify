'use strict'

const UglifyJS = require('uglify-js')
const CleanCSS = require('clean-css')
const minifierHTML = require('html-minifier')
const autoprefixer = require('autoprefixer')
const postcss = require('postcss')

let config

/**
 * 转换CSS样式兼容性
 * @param {String} text CSS样式
 * @returns
 */
function transformCSS(text) {
  const { enable, options } = config.postcss
  if (!enable) return text
  const p = [autoprefixer(options)]
  return postcss(p).process(text, { from: undefined }).css
}

function minifyJS(str) {
  config = this.config.minify
  const { enable, options } = config.js
  if (!enable) return str
  str = UglifyJS.minify(str, options).code
  return str
}

function minifyCSS(str) {
  config = this.config.minify
  const { enable, options } = config.css
  if (!enable) return str
  str = transformCSS(str)
  str = new CleanCSS(options).minify(str).styles
  return str
}

function minifyHTML(str) {
  config = this.config.minify
  let { enable, options } = config.html
  if (!enable) return str
  options = options ? options : {}

  if (config.postcss.enable) {
    options.minifyCSS = (text) => {
      const css = transformCSS(text)
      return new CleanCSS(config.css.options || {}).minify(css).styles || css
    }
  }
  return minifierHTML.minify(str, options)
}

module.exports = { minifyJS, minifyCSS, minifyHTML }
