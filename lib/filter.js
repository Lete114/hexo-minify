'use strict'

var UglifyJS = require('uglify-js')
var CleanCSS = require('clean-css')
var minifierHTML = require('html-minifier').minify

function minifyJS(str, data) {
  const { enable, options } = this.config.minify.js
  if (!enable) return str
  var result = UglifyJS.minify(str, options).code
  return result
}

function minifyCSS(str, data) {
  const { enable, options } = this.config.minify.css
  if (!enable) return str
  var result = new CleanCSS(options).minify(str).styles
  return result
}

function minifyHTML(str, data) {
  const { enable, options } = this.config.minify.html
  if (!enable) return str
  return minifierHTML(str, options)
}

module.exports = { minifyJS, minifyCSS, minifyHTML }
