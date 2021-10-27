<div align="right">
  语言: 中文
  <a title="English" href="/README_EN.md">English</a>
</div>

## Hexo-minify

Hexo-minify 是一款 hexo 压缩插件，它可以压缩 HTML、CSS、JS

## 安装

```
npm install hexo-minify --save
```

## 说明

| 类型    | 属性         | 默认值     | 描述         |
| ------- | ------------ | ---------- | ------------ |
| Boolean | js.enable    | true       | 是否开启     |
| Boolean | css.enable   | true       | 是否开启     |
| Boolean | html.enable  | true       | 是否开启     |
| Boolean | js.options   | {}         | [更多配置](https://github.com/mishoo/UglifyJS) |
| Boolean | css.options  | {}         | [更多配置](https://github.com/clean-css/clean-css#compatibility-modes) |
| Boolean | html.options | 看下方表格 | [更多配置](https://github.com/kangax/html-minifier#options-quick-reference) |

<details>
<summary><code>html.options</code>默认值 - 点击展开</summary>

| 类型    | 属性                  | 默认值 | 描述           |
| ------- | --------------------- | ------ | -------------- |
| Boolean | minifyJS              | true   | js 压缩        |
| Boolean | minifyCSS             | true   | css 压缩       |
| Boolean | removeComments        | true   | 删除注释       |
| Boolean | collapseWhitespace    | true   | 删除多余空白处 |
| Boolean | removeAttributeQuotes | true   | 删除属性引号   |

</details>

如果你想关闭某个功能，可以在根目录的`_config.yml`配置

```yml
minify:
  js:
    enable: true
  css:
    enable: true
  html:
    enable: true
```

> 适用于`1.1.0`之前的版本

```yml
minify:
  js: true
  css: true
  html: true
```

## Hexo 相关

[Hexo-SEO-AutoPush](https://github.com/lete114/hexo-seo-autopush)

[hexo-theme-MengD](https://github.com/lete114/hexo-theme-MengD)
