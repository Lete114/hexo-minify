'use strict'

var UglifyJS = require('uglify-js')
var CleanCSS = require('clean-css')
var minifierHTML = require('html-minifier').minify

function minifyJS(str, data) {
  if (!this.config.minify.js) return str
  var result = UglifyJS.minify(str).code
  return result
}

function minifyCSS(str, data) {
  if (!this.config.minify.css) return str
  var result = new CleanCSS({}).minify(str).styles
  return result
}

function minifyHTML(str, data) {
  try {
    const options = {
      removeComments: true,
      collapseWhitespace: true,
      minifyJS: true,
      minifyCSS: true
    }
    if (!this.config.minify.html) return str
    return minifierHTML(str, options)
  } catch (error) {
    console.log('\x1B[31m%s\x1B[0m', '出现异常，压缩失败！')
    console.log('\x1B[31m%s\x1B[0m', '请规范你的MarkDown语法！')
    console.log('\x1B[33m%s\x1B[0m', '检查是否是“"”的问题，错误如下！')
    console.log(error)
    return str
  }
}

module.exports = { minifyJS, minifyCSS, minifyHTML }
