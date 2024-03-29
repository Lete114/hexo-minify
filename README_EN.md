<div align="right">
  Language: English
  <a title="Chinese" href="/README.md">中文</a>
</div>

## Hexo-minify

Hexo-minify is a Hexo compression plug-in that compresses HTML, CSS, JS, Font, and Image(jpg,png,gif,webp,svg)

## Install

```
npm install hexo-minify --save
```

## 说明

> If you want to change it, you can edit it in the Hexo configuration file to override it

> If you only install the plugin and do not fill in the relevant configuration, the following default configuration information will be used

Default configuration information

```yml
## Hexo-minify Default Config Options
minify:
  preview: false ## Whether to compress during local preview
  exclude: ['*.min.*']
  js:
    enable: true
    sourceMap:
      enable: false ## generate sourceMap
      ## Insert the sourceMappingURL into the compressed js file, or add the sourceMap manually in the browser developer tools if it is false
      sourceMappingURL: false  ## //# sourceMappingURL=xxx.js.map
    ## Detailed configuration: https://github.com/terser/terser#minify-options
    options: {}
  css:
    enable: true
    ## Detailed configuration: https://github.com/clean-css/clean-css#compatibility-modes
    options: {}
  html:
    enable: true
    ## Detailed configuration: https://github.com/kangax/html-minifier#options-quick-reference
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
      ## Detailed configuration: https://github.com/imagemin/imagemin-svgo#imageminsvgooptionsbuffer
      options: {}
    jpg:
      enable: true
      ## Detailed configuration: https://github.com/imagemin/imagemin-jpegtran#options
      options: {}
    png:
      enable: true
      ## Detailed configuration: https://github.com/imagemin/imagemin-pngquant#options
      options: {}
    gif:
      enable: true
      ## Detailed configuration: https://www.npmjs.com/package/imagemin-gifsicle#options
      options: {}
    webp:
      enable: true
      ## Detailed configuration: https://github.com/imagemin/imagemin-webp#options
      options: {}
  font:
    enable: false
    ## Detailed configuration: https://github.com/Lete114/fontmin-spider#api
    options: {}
```

## Hexo Related

[hexo-theme-MengD](https://github.com/lete114/hexo-theme-MengD)

[hexo-seo-autopush](https://github.com/lete114/hexo-seo-autopush)

[hexo-hash](https://github.com/Lete114/Hexo-hash)

[hexo-prefetch](https://github.com/Lete114/Hexo-prefetch)