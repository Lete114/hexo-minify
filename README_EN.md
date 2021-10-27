<div align="right">
  Language: en
  <a title="Chinese" href="/README.md">中文</a>
</div>

## Hexo-minify

Hexo-minify is a Hexo compression plug-in that compresses HTML, CSS, and JS

## Install

```
npm install hexo-minify --save
```

## Description

| Type    | Property     | Default                 | Description                                                                           |
| ------- | ------------ | ----------------------- | ------------------------------------------------------------------------------------- |
| Boolean | js.enable    | true                    | Enable                                                                                |
| Boolean | css.enable   | true                    | Enable                                                                                |
| Boolean | html.enable  | true                    | Enable                                                                                |
| Boolean | js.options   | {}                      | [More configuration](https://github.com/mishoo/UglifyJS)                              |
| Boolean | css.options  | {}                      | [More configuration](https://github.com/clean-css/clean-css#compatibility-modes)      |
| Boolean | html.options | Look at the table below | [More configuration](https://github.com/kangax/html-minifier#options-quick-reference) |

<details>
<summary><code>html.options</code>Description - Tap to open</summary>

| Type    | Property              | Default | Description                                                            |
| ------- | --------------------- | ------- | ---------------------------------------------------------------------- |
| Boolean | minifyJS              | true    | Minify JavaScript in script elements and event attributes              |
| Boolean | minifyCSS             | true    | Minify CSS in style elements and style attributes                      |
| Boolean | removeComments        | true    | Strip HTML comments                                                    |
| Boolean | collapseWhitespace    | true    | Collapse white space that contributes to text nodes in a document tree |
| Boolean | removeAttributeQuotes | true    | Remove quotes around attributes when possible                          |

</details>

If you want to disable a feature, you can configure it in the root directory `_config.yml`

```yml
minify:
  js:
    enable: true
  css:
    enable: true
  html:
    enable: true
```

> Applies to versions prior to `1.1.0`

```yml
minify:
  js: true
  css: true
  html: true
```

## Hexo Related

[Hexo-SEO-AutoPush](https://github.com/lete114/hexo-seo-autopush)

[hexo-theme-MengD](https://github.com/lete114/hexo-theme-MengD)
