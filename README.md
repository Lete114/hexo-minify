<div align="right">
  语言: 中文
  <a title="English" href="/README_EN.md">English</a>
</div>

## Hexo-minify

Hexo-minify 是一款 Hexo 压缩插件，它可以压缩 HTML、CSS、JS

## 安装

```
npm install hexo-minify --save
```

## 说明

> 如需修改，可在Hexo配置文件内编辑覆盖
> 如果仅安装插件，并未填写相关配置，则使用默认配置信息

默认配置信息
```yml
## Hexo-minify Default Config Options
minify:
  js:
    enable: true
    ## 详细配置: https://github.com/mishoo/UglifyJS
    options:
  css:
    enable: true
    ## 详细配置: https://github.com/clean-css/clean-css#compatibility-modes
    options:
  html:
    enable: true
    ## 详细配置: https://github.com/kangax/html-minifier#options-quick-reference
    options: 
      minifyJS: true # Compressed JavaScript
      minifyCSS: true # CSS Compressed
      removeComments: true # Remove the comments
      collapseWhitespace: true # Delete any extra space
      removeAttributeQuotes: true # Delete attribute quotes
  # + 1.2.0 版本新增
  postcss:
    enable: true
    ## 详细配置: https://github.com/postcss/autoprefixer#options
    ## 注意Hexo-minify仅内置了autoprefixer插件
    ## 受Hexo限制，目前无法实现自定义postcss插件
    options: 
      # JavaScript 数组写法
      # overrideBrowserslist: ['> 1%', 'last 2 versions', 'not dead']
      # YAML 数组写法
      overrideBrowserslist: 
        - '> 1%' # 特殊符号需要使用'或"
        - last 2 versions
        - not dead
  babel: 
    enable: true
    ## 详细配置: https://github.com/babel/babel-preset-env#options
    ## 注意Hexo-minify仅内置了@babel/preset-env插件
    ## 受Hexo限制，目前无法实现自定义babel插件
    options:
      # 此配置稍微复炸，建议使用 JavaScript 数组写法
      presets: [
        [
          '@babel/preset-env',
          { 
            targets: { browsers: ['> 1%', 'last 2 versions', 'not dead'] }
          }
        ]
      ]
```

> 适用于`1.1.0`之前的版本

```yml
minify:
  js: true
  css: true
  html: true
```

## Hexo 相关

[Hexo-theme-MengD](https://github.com/lete114/hexo-theme-MengD)

[Hexo-SEO-AutoPush](https://github.com/lete114/hexo-seo-autopush)
