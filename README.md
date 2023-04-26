<div align="right">
  语言: 中文
  <a title="English" href="/README_EN.md">English</a>
</div>

## Hexo-minify

Hexo-minify 是一款 Hexo 压缩插件，它可以压缩 HTML、CSS、JS、Font、Image(jpg,png,gif,webp,svg)

## 安装

```
npm install hexo-minify --save
```

## 说明

> 如需修改，可在 Hexo 配置文件内编辑覆盖

> 如果仅安装插件，并未填写相关配置，则使用以下默认配置信息

```yml
## Hexo-minify Default Config Options
minify:
  preview: false ## 本地预览时是否压缩
  exclude: ['*.min.*']
  js:
    enable: true
    sourceMap:
      enable: false ## 生成 sourceMap
      ## 将 sourceMappingURL 插入压缩后的 js 文件，如果为 false 则需要在浏览器开发者工具中手动添加 sourceMap
      sourceMappingURL: false ## //# sourceMappingURL=xxx.js.map
    ## 详细配置: https://github.com/terser/terser#minify-options
    options: {}
  css:
    enable: true
    ## 详细配置: https://github.com/clean-css/clean-css#compatibility-modes
    options: {}
  html:
    enable: true
    ## 详细配置: https://github.com/kangax/html-minifier#options-quick-reference
    options:
      minifyJS: true # Compressed JavaScript
      minifyCSS: true # CSS Compressed
      removeComments: true # Remove the comments
      collapseWhitespace: true # Delete any extra space
      removeAttributeQuotes: true # Delete attribute quotes
  image:
    enable: true
    svg:
      enable: true
      ## 详细配置: https://github.com/imagemin/imagemin-svgo#imageminsvgooptionsbuffer
      options: {}
    jpg:
      enable: true
      ## 详细配置: https://github.com/imagemin/imagemin-jpegtran#options
      options: {}
    png:
      enable: true
      ## 详细配置: https://github.com/imagemin/imagemin-pngquant#options
      options: {}
    gif:
      enable: true
      ## 详细配置: https://www.npmjs.com/package/imagemin-gifsicle#options
      options: {}
    webp:
      enable: true
      ## 详细配置: https://github.com/imagemin/imagemin-webp#options
      options: {}
  font:
    enable: false
    ## 详细配置: https://github.com/Lete114/fontmin-spider#api
    options: {}
```

## Hexo 相关

[hexo-theme-MengD](https://github.com/lete114/hexo-theme-MengD)

[hexo-seo-autopush](https://github.com/lete114/hexo-seo-autopush)

[hexo-hash](https://github.com/Lete114/Hexo-hash)

[hexo-prefetch](https://github.com/Lete114/Hexo-prefetch)
