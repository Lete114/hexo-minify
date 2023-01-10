'use strict'

const SWC = require('@swc/core')
const esbuild = require('esbuild')
const minifierHTML = require('html-minifier')
const autoprefixer = require('autoprefixer')
const postcss = require('postcss')
const { extname } = require('path')
const { readFile, writeFile } = require('fs').promises
const globby = require('globby')
const imagemin = require('imagemin')
const imageminWebp = require('imagemin-webp')
const imageminSvgo = require('imagemin-svgo')
const imageminJpegtran = require('imagemin-jpegtran')
const imageminPngquant = require('imagemin-pngquant')
const imageminGifsicle = require('imagemin-gifsicle')

const { esbuildMinifyCSS } = require('./utils')

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
  str = SWC.minifySync(str, options).code
  return str
}

function minifyCSS(str) {
  config = this.config.minify
  const { enable, options } = config.css
  if (!enable) return str
  str = transformCSS(str)
  str = esbuildMinifyCSS(str)
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
      return esbuildMinifyCSS(css) || css
    }
  }
  return minifierHTML.minify(str, options)
}

async function miniImage() {
  const {
    public_dir,
    config: { minify }
  } = this
  const config = minify.image

  if (!config.enable) return

  const targetExtension = []

  if (config.svg.enable) targetExtension.push('.svg')
  if (config.jpg.enable) targetExtension.push('.jpg')
  if (config.png.enable) targetExtension.push('.png')
  if (config.gif.enable) targetExtension.push('.gif')
  if (config.webp.enable) targetExtension.push('.webp')

  if (!targetExtension.length) return

  const globbyOptions = { onlyFiles: true, absolute: true, cwd: public_dir }

  const files = await globby(`**/*{${targetExtension.join()}}`, globbyOptions)

  const pluginMaps = {
    '.webp': imageminWebp(config.svg.options || {}),
    '.svg': imageminSvgo(config.jpg.options || {}),
    '.jpg': imageminJpegtran(config.png.options || {}),
    '.png': imageminPngquant(config.gif.options || {}),
    '.gif': imageminGifsicle(config.webp.options || {})
  }

  files.forEach(handler)

  async function handler(path) {
    const ext = extname(path)

    const buffer = await readFile(path)
    if (ext !== '.webp') {
      const newBuffer = await imagemin.buffer(buffer, { plugins: [pluginMaps['.webp']] })
      const writePath = path.replace(new RegExp(`${ext}$`), '.webp')
      await writeFile(writePath, newBuffer)
    }

    const newBuffer = await imagemin.buffer(buffer, { plugins: [pluginMaps[ext]] })
    await writeFile(path, newBuffer)
  }
}

module.exports = { minifyJS, minifyCSS, minifyHTML, miniImage }
