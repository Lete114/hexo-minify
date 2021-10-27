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

  const defaultConfig = {
    minify: {
      js: { enable: true, options: {} },
      css: { enable: true, options: {} },
      html: { enable: true, options: {} }
    }
  }

  hexo.config = JSON.parse(JSON.stringify(Object.assign(hexo.config, defaultConfig)))

  describe('minifyJS', () => {
    const es5 = `
    var obj = {
        name: 'lisi',
        age: 18,
        calc: function(a,b) {
          return a + b;
        },
        merge: function(a,b) {
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
        },
        merge(a,b) {
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

    it('options - minify js', async () => {
      // toplevel: Remove unused code

      hexo.config.minify.js.options.toplevel = true

      const options = hexo.config.minify.js.options

      const result = await minifyJS(es6, { path: 'source/test.js' })
      // result Output: console.log(3);

      result.should.eql(UglifyJS.minify(es6, options).code)

      delete hexo.config.minify.js.options.toplevel
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
    }
    h1 {
      color: red;
      font-size: 1px;
    }
    a {
      color:red;
      font-size: 2px;
    }`

    it('minify css', async () => {
      const result = await minifyCSS(body, { path: 'source/test.css' })

      result.should.eql(new CleanCSS({}).minify(body).styles)
    })

    it('options - minify css', async () => {
      // keep-breaks: formats output the default way but adds line breaks for improved readability

      hexo.config.minify.css.options.format = 'keep-breaks'

      const options = hexo.config.minify.css.options

      const result = await minifyCSS(body, { path: 'source/test.css' })

      /*
      result Output:

      body a{text-decoration:none;color:#00c4b6;transition:all .5s}
      h1{color:red;font-size:1px}
      a{color:red;font-size:1px}

       */

      result.should.eql(new CleanCSS(options).minify(body).styles)

      delete hexo.config.minify.css.options.format
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
      minifyJS: true, // js 压缩
      minifyCSS: true, // css 压缩
      removeComments: true, // 删除注释
      collapseWhitespace: true, // 删除多余空白处
      removeAttributeQuotes: true // 删除属性引号
    }

    it('minify html', async () => {
      hexo.config.minify.html.options = options

      const result = await minifyHTML(html, { path: 'source/test.html' })

      result.should.eql(minifierHTML(html, options))
    })
  })
})
