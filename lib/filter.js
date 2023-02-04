'use strict'

const { extname } = require('path')
const { readFile, writeFile } = require('fs').promises
const globby = require('globby')
const minimatch = require('minimatch')
const terser = require('terser')
const CleanCSS = require('clean-css')
const minifierHTML = require('html-minifier')
const imagemin = require('imagemin')
const imageminWebp = require('imagemin-webp')
const imageminSvgo = require('imagemin-svgo')
const imageminJpegtran = require('imagemin-jpegtran')
const imageminPngquant = require('imagemin-pngquant')
const imageminGifsicle = require('imagemin-gifsicle')
const { spider } = require('fontmin-spider')

function excludeHandler({ config: { minify } }, path) {
  const exclude = typeof minify.exclude === 'string' ? [minify.exclude] : minify.exclude
  return exclude.some((item) => minimatch(path, item, { matchBase: true }))
}

async function minifyJS(str, { path }) {
  if (excludeHandler(this, path)) return str
  const config = this.config.minify
  const { enable, options } = config.js
  if (!enable) return str
  const { code } = await terser.minify(str, options)
  return code
}

function minifyCSS(str, { path }) {
  if (excludeHandler(this, path)) return str
  const config = this.config.minify
  const { enable, options } = config.css
  if (!enable) return str
  str = new CleanCSS(options || {}).minify(str).styles
  return str
}

function minifyHTML(str, { path }) {
  if (excludeHandler(this, path)) return str
  const config = this.config.minify
  let { enable, options } = config.html
  if (!enable) return str
  return minifierHTML.minify(str, options)
}

async function miniImage() {
  const hexo = this
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
    if (excludeHandler(hexo, path)) return
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

function miniFont() {
  const {
    public_dir,
    config: { minify }
  } = this
  const config = minify.font
  if (!config.enable) return
  const options = Object.assign({}, config.options, { basePath: public_dir })
  spider(options)
}

module.exports = { minifyJS, minifyCSS, minifyHTML, miniImage, miniFont }
