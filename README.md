## Hexo-minify

Hexo-minify是一款hexo压缩插件，它可以压缩HTML、CSS、JS

## 安装

```
npm install hexo-minify --save
```

## 说明

|类型|属性|默认值|
------ | ------ | ------
Boolean|js|true
Boolean|css|true
Boolean|html|true

如果你想关闭某个功能，可以在根目录的`_config.yml`配置
```yml
minify:
  js: true
  css: true
  html: true
```

## 感谢

Hexo-minify `JS` By [UglifyJS](https://github.com/mishoo/UglifyJS)

Hexo-minify `CSS` By [Clean-CSS](https://github.com/jakubpawlowicz/clean-css)

Hexo-minify `HTML` By [HTMLMinifier](https://github.com/kangax/html-minifier)

## Hexo相关

[Hexo-SEO-AutoPush](https://github.com/lete114/hexo-seo-autopush)

[hexo-theme-MengD](https://github.com/lete114/hexo-theme-MengD)

[Hexo-theme-Yilia-Pro](https://github.com/lete114/hexo-theme-yilia-pro)
