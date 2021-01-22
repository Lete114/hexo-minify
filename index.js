/**
 * hexo-minify
 * author: Lete114
 * version: 1.0.0
 */
'use strict'

var UglifyJS = require('uglify-js');
var CleanCSS  = require('clean-css');
var minifyHTML = require('html-minifier').minify;

var config = hexo.config;
if(config.minify==null){
  config.minify={}
}

hexo.extend.filter.register('after_render:js', function(str, data){
  if(config.minify.js==true||config.minify.js==null){
    var result = UglifyJS.minify(str);
    return result.code;
  }
  return str;
});

hexo.extend.filter.register('after_render:css', function(str, data){
  if(config.minify.css==true||config.minify.css==null){
    var result = new CleanCSS({}).minify(str);
    return result.styles;
  }
  return str;
});

hexo.extend.filter.register('after_render:html', function(str, data){
  try {
    if(config.minify.html==true||config.minify.html==null){
      var result = minifyHTML(str,{
        removeComments: true,
        collapseWhitespace: true,
        minifyJS:true, 
        minifyCSS:true
      });
      return result;
    }
    return str;
  } catch(error) {
    console.log('\x1B[31m%s\x1B[0m','出现异常，压缩失败！');
    console.log('\x1B[31m%s\x1B[0m','请规范你的MarkDown语法！');
    console.log('\x1B[33m%s\x1B[0m','检查是否是“"”的问题，错误如下！');
    console.log(error);
    return str;
  }
});
