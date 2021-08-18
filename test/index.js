'use strict'

const should = require('chai').should()
var UglifyJS = require('uglify-js')
var CleanCSS = require('clean-css')
var minifierHTML = require('html-minifier').minify

describe('hexo-minify', () => {
  const Hexo = require('hexo')
  const hexo = new Hexo(__dirname, { silent: true })
  const minifyJS = require('../lib/filter').minifyJS.bind(hexo)
  const minifyCSS = require('../lib/filter').minifyCSS.bind(hexo)
  const minifyHTML = require('../lib/filter').minifyHTML.bind(hexo)
  hexo.config = JSON.parse(
    JSON.stringify(
      Object.assign(hexo.config, {
        minify: {
          js: true,
          css: true,
          html: true
        }
      })
    )
  )

  describe('minifyJS', () => {
    const es5 = `
    var obj = {
        name: 'lisi',
        age: 18,
        calc: function(a,b) {
            return a + b;
        }
    };
    console.log(obj.calc(1,2));`

    const es6 = `
    const obj = {
        name: 'lisi',
        age: 18,
        calc(a,b) {
            return a + b;
        }
    };
    console.log(obj.calc(1,2));`

    it('es5 - minify js', async () => {
      const result = await minifyJS(es5, { path: 'source/test.js' })

      result.should.eql(UglifyJS.minify(es5).code)
    })

    it('es6 - minify js', async () => {
      const result = await minifyJS(es6, { path: 'source/test.js' })

      result.should.eql(UglifyJS.minify(es6).code)
    })

    it('after_render:js', async () => {
      hexo.extend.filter.register('after_render:js', minifyJS)

      const result = await hexo.extend.filter.exec('after_render:js', es5)

      result.should.eql(UglifyJS.minify(es5).code)
    })
  })

  describe('minifyCSS', () => {
    const body = `
    body a {
      text-decoration: none;
      color: #00c4b6;
      transition: all .5s;
    }`

    it('minify css', async () => {
      const result = await minifyCSS(body, { path: 'source/test.css' })

      result.should.eql(new CleanCSS({}).minify(body).styles)
    })

    it('after_render:css', async () => {
      hexo.extend.filter.register('after_render:css', minifyCSS)

      const result = await hexo.extend.filter.exec('after_render:css', body)

      result.should.eql(new CleanCSS({}).minify(body).styles)
    })
  })
  describe('minifyHTML', () => {
    const html = `
    <div class="framework-info">
      <span>框架 </span>
      <a href="https://hexo.io" target="_blank">Hexo</a>
      <span class="footer-separator">|</span>
      <span>主题 </span>
      <a href="https://github.com/lete114/hexo-theme-MengD" target="_blank">MengD.(萌典)</a>
    </div>`

    const options = {
      removeComments: true,
      collapseWhitespace: true,
      minifyJS: true,
      minifyCSS: true
    }

    it('minify html', async () => {
      const result = await minifyHTML(html, { path: 'source/test.html' })

      result.should.eql(minifierHTML(html, options))
    })
  })
})
