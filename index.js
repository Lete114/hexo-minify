/**
 * hexo-minify
 * author: Lete114
 * version: 1.0.2
 */
"use strict";

const path = require("path");
const fs = require("fs");
const UglifyJS = require("uglify-js");
const CleanCSS = require("clean-css");
const minifyHTML = require("html-minifier").minify;
const { minify_image } = require("./lib/utils");

let config = hexo.config;
if (!config.minify) {
  config.minify = {
    js: true,
    css: true,
    html: true,
    image: {
      enable: false,
      quality: 0.5,
      RegExp: null,
    },
  };
}

hexo.on("deployBefore", () => {
  if (!config.minify.image.enable) return;
  const quality = config.minify.image.quality;
  const RegExp = config.minify.image.RegExp;
  var public_dir = path.resolve(process.cwd(), config.public_dir);
  if (fs.existsSync(public_dir)) minify_image(public_dir, quality, RegExp);
});

hexo.extend.filter.register("after_render:js", (str, data) => {
  if (!config.minify.js) return str;
  var result = UglifyJS.minify(str);
  return result.code;
});

hexo.extend.filter.register("after_render:css", (str, data) => {
  if (!config.minify.css) return str;
  var result = new CleanCSS({}).minify(str);
  return result.styles;
});

hexo.extend.filter.register("after_render:html", (str, data) => {
  try {
    if (!config.minify.html) return str;
    var result = minifyHTML(str, {
      removeComments: true,
      collapseWhitespace: true,
      minifyJS: true,
      minifyCSS: true,
    });
    return result;
  } catch (error) {
    console.log("\x1B[31m%s\x1B[0m", "出现异常，压缩失败！");
    console.log("\x1B[31m%s\x1B[0m", "请规范你的MarkDown语法！");
    console.log("\x1B[33m%s\x1B[0m", '检查是否是“"”的问题，错误如下！');
    console.log(error);
    return str;
  }
});
