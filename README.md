## Hexo-minify

Hexo-minify 是一款 hexo 压缩插件，它可以压缩 HTML、CSS、JS

## 安装

```
npm install hexo-minify --save
```

## 说明

| 类型    | 属性    | 默认值 |
| ------- | ------- | ------ |
| Boolean | js      | true   |
| Boolean | css     | true   |
| Boolean | html    | true   |
| Object  | image   | 无     |
| Boolean | enable  | false  |
| Number  | quality | 0.5    |
| String  | RegExp  | null   |

如果你想关闭某个功能，可以在根目录的`_config.yml`配置

```yml
minify:
  js: true
  css: true
  html: true
  image:
    enable: true
    quality: 0.5
    RegExp: $\.jpg|\.jpeg|\.png|\.gif
```

## Hexo 相关

[hexo-theme-MengD](https://github.com/lete114/hexo-theme-MengD)

[Hexo-SEO-AutoPush](https://github.com/lete114/hexo-seo-autopush)

