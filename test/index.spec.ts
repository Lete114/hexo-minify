'use strict'

import { describe, expect, it } from 'vitest'

const Hexo = require('hexo')
const hexo = new Hexo(__dirname, { silent: true })
const minifyJS = require('../lib/filter').minifyJS.bind(hexo)
const minifyCSS = require('../lib/filter').minifyCSS.bind(hexo)
const minifyHTML = require('../lib/filter').minifyHTML.bind(hexo)

const defaultConfig = {
  minify: {
    js: { enable: true, options: {} },
    css: { enable: true, options: {} },
    html: { enable: true, options: {} },
    postcss: { enable: true, options: {} },
  }
}

hexo.config = JSON.parse(
  JSON.stringify(Object.assign(hexo.config, defaultConfig))
)

const deepClone = function (obj) {
  const json = JSON.stringify(obj)
  return JSON.parse(json)
}

const hexoConfig = deepClone(hexo.config)

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
    hexo.config = deepClone(hexoConfig)
    const result = await minifyJS(es5, { path: 'source/test.js' })

    expect(result).toMatchInlineSnapshot('"var obj={name:\\"lisi\\",age:18,calc:function(n,c){return n+c},merge:function(n,c){return n+c}};console.log(obj.calc(1,2));"')
  })

  it('es6 - minify js', async () => {
    hexo.config = deepClone(hexoConfig)
    const result = await minifyJS(es6, { path: 'source/test.js' })

    expect(result).toMatchInlineSnapshot('"const obj={name:\\"lisi\\",age:18,calc:(c,o)=>c+o,merge:(c,o)=>c+o};console.log(obj.calc(1,2));"')
  })

  it('options - minify js', async () => {
    hexo.config = deepClone(hexoConfig)
    // toplevel: Remove unused code

    hexo.config.minify.js.options.toplevel = true

    const options = hexo.config.minify.js.options

    const result = await minifyJS(es6, { path: 'source/test.js' })
    // result Output: console.log(3);

    expect(result).toMatchInlineSnapshot('"const obj={name:\\"lisi\\",age:18,calc:(c,o)=>c+o,merge:(c,o)=>c+o};console.log(obj.calc(1,2));"')
  })

  it('after_render:js', async () => {
    hexo.config = deepClone(hexoConfig)
    hexo.extend.filter.register('after_render:js', minifyJS)

    const result = await hexo.extend.filter.exec('after_render:js', es5)

    expect(result).toMatchInlineSnapshot('"var obj={name:\\"lisi\\",age:18,calc:function(n,c){return n+c},merge:function(n,c){return n+c}};console.log(obj.calc(1,2));"')
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
    hexo.config = deepClone(hexoConfig)
    const result = await minifyCSS(body, { path: 'source/test.css' })

    expect(result).toMatchInlineSnapshot(`
      "body a{text-decoration:none;color:#00c4b6;transition:all .5s}h1{color:red;font-size:1px}a{color:red;font-size:2px}
      "
    `)
  })

  it('shouldn\'t minify star', async () => {
    hexo.config = deepClone(hexoConfig)
    const result = await minifyCSS(`table:not(figure.highlight *) { display: block; }`, { path: 'source/test.css' })

    expect(result).toMatchInlineSnapshot(`
      "table:not(figure.highlight *){display:block}
      "
    `)
  })

  it('options - minify css', async () => {
    hexo.config = deepClone(hexoConfig)

    const result = await minifyCSS(body)

    expect(result).toMatchInlineSnapshot(`
      "body a{text-decoration:none;color:#00c4b6;transition:all .5s}h1{color:red;font-size:1px}a{color:red;font-size:2px}
      "
    `)

    delete hexo.config.minify.css.options.format
  })

  it('after_render:css', async () => {
    hexo.config = deepClone(hexoConfig)
    hexo.extend.filter.register('after_render:css', minifyCSS)

    const result = await hexo.extend.filter.exec('after_render:css', body)

    expect(result).toMatchInlineSnapshot(`
      "body a{text-decoration:none;color:#00c4b6;transition:all .5s}h1{color:red;font-size:1px}a{color:red;font-size:2px}
      "
    `)
  })
})

describe('minifyHTML', () => {
  const html = `
  <div class="framework-info">
    <style>
      body{
        transform: rotateY(45deg);
        display: flex;
      }

      a {
        transition: transform 1s;
        transform: rotateX(45deg);
      }
      b {
        transform: translateX(45deg);
        transform-origin: 0 0;
      }
      em {
        transform: rotateZ(45deg);
      }
      @keyframes anim {
        from {
          transform: rotate(90deg);
        }
      }
    </style>
    <span>框架 </span>
    <a href="https://hexo.io" target="_blank">Hexo</a>
    <span class="footer-separator">|</span>
    <span>主题 </span>
    <a href="https://github.com/lete114/hexo-theme-MengD" target="_blank">MengD.(萌典)</a>
    <script>

      // test1
      const arr1 = [1,2,3]
      function run(){
        const arr2 = [1,6,8,9]
        arr1.push(100)
        arr2.push(10)
        return [...arr1,...arr2]
      }
      const result = run().map((i)=>i+1)
      console.log(result)

      // test2
      const obj = {name:'Lete'}
      console.log(obj?.name)
      console.log(obj.age||18)

    </script>
  </div>`

  const options = {
    minifyJS: true, // js 压缩
    minifyCSS: true, // css 压缩
    removeComments: true, // 删除注释
    collapseWhitespace: true, // 删除多余空白处
    removeAttributeQuotes: true // 删除属性引号
  }

  it('minify html', async () => {
    hexo.config = deepClone(hexoConfig)
    hexo.config.minify.html.options = options

    const result = await minifyHTML(html, { path: 'source/test.html' })

    expect(result).toMatchInlineSnapshot('"<div class=framework-info><style>body{transform:rotateY(45deg);display:flex}a{transition:transform 1s;transform:rotateX(45deg)}b{transform:translate(45deg);transform-origin:0 0}em{transform:rotate(45deg)}@-webkit-keyframes anim{0%{transform:rotate(90deg)}}@keyframes anim{0%{transform:rotate(90deg)}}</style><span>框架 </span><a href=https://hexo.io target=_blank>Hexo</a> <span class=footer-separator>|</span> <span>主题 </span><a href=https://github.com/lete114/hexo-theme-MengD target=_blank>MengD.(萌典)</a><script>const arr1=[1,2,3];function run(){const o=[1,6,8,9];return arr1.push(100),o.push(10),[...arr1,...o]}const result=run().map(o=>o+1);console.log(result);const obj={name:\\"Lete\\"};console.log(obj?.name),console.log(obj.age||18)</script></div>"')
  })

  it('postcss - autoprefixer [not dead]', async () => {
    hexo.config = deepClone(hexoConfig)
    const postcssOptions = {
      overrideBrowserslist: ['> 1%', 'last 2 versions', 'not dead']
    }

    hexo.config.minify.html.options = options
    hexo.config.minify.postcss.options = postcssOptions

    const result = await minifyHTML(html, { path: 'source/test.html' })

    const style = `<style>body{transform:rotateY(45deg);display:flex}a{transition:transform 1s;transform:rotateX(45deg)}b{transform:translateX(45deg);transform-origin:0 0}em{transform:rotateZ(45deg)}@-webkit-keyframes anim{from{transform:rotate(90deg)}}@keyframes anim{from{transform:rotate(90deg)}}</style>`
    const isOK = result.indexOf(style) !== -1

    expect(isOK).toEqual(true)
  })

  it('postcss - autoprefixer [IE 6]', async () => {
    hexo.config = deepClone(hexoConfig)
    const postcssOptions = {
      overrideBrowserslist: ['> 1%', 'last 2 versions', 'IE 6']
    }

    hexo.config.minify.html.options = options
    hexo.config.minify.postcss.options = postcssOptions

    const result = await minifyHTML(html, { path: 'source/test.html' })

    const style = `<style>body{-webkit-transform:rotateY(45deg);transform:rotateY(45deg);display:-webkit-box;display:-ms-flexbox;display:flex}a{-webkit-transition:-webkit-transform 1s;transition:-webkit-transform 1s;transition:transform 1s;transition:transform 1s,-webkit-transform 1s;-webkit-transform:rotateX(45deg);transform:rotateX(45deg)}b{-webkit-transform:translateX(45deg);transform:translateX(45deg);-webkit-transform-origin:0 0;transform-origin:0 0}em{-webkit-transform:rotateZ(45deg);transform:rotateZ(45deg)}@-webkit-keyframes anim{from{-webkit-transform:rotate(90deg);transform:rotate(90deg)}}@keyframes anim{from{-webkit-transform:rotate(90deg);transform:rotate(90deg)}}</style>`
    const isOK = result.indexOf(style) !== -1

    expect(isOK).toEqual(true)
  })

  
})
