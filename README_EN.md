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

## 说明

> If you need to change it, you can edit the override in the Hexo configuration file
> If you only install the plugin and do not fill in the relevant configuration, the default configuration information will be used

Default configuration information
```yml
## Hexo-minify Default Config Options
minify:
  js:
    enable: true
    ## Detailed configuration: https://github.com/mishoo/UglifyJS
    options:
  css:
    enable: true
    ## Detailed configuration: https://github.com/clean-css/clean-css#compatibility-modes
    options:
  html:
    enable: true
    ## Detailed configuration: https://github.com/kangax/html-minifier#options-quick-reference
    options: 
      minifyJS: true # Compressed JavaScript
      minifyCSS: true # CSS Compressed
      removeComments: true # Remove the comments
      collapseWhitespace: true # Delete any extra space
      removeAttributeQuotes: true # Delete attribute quotes
  # + 1.2.0 Versions Added
  postcss:
    enable: true
    ## Detailed configuration: https://github.com/postcss/autoprefixer#options
    ## Note that Hexo-minify only has the autoprefixer plugin built in
    ## Constrained by Hexo, custom Postcss plug-ins are currently not available
    options: 
      # JavaScript Array writing method
      # overrideBrowserslist: ['> 1%', 'last 2 versions', 'not dead']
      # YAML Array writing method
      overrideBrowserslist: 
        - '> 1%' # Special symbols require the use of ' or "
        - last 2 versions
        - not dead
  babel: 
    enable: true
    ## Detailed configuration: https://github.com/babel/babel-preset-env#options
    ## Note that Hexo-minify only has the @babel/preset-env plugin built in
    ## Constrained by Hexo, custom Babel plug-ins are currently not available
    options:
      # This configuration is complex It is recommended to use JavaScript Array writing method
      presets: [
        [
          '@babel/preset-env',
          { 
            targets: { browsers: ['> 1%', 'last 2 versions', 'not dead'] }
          }
        ]
      ]
```

> Applies to versions prior to `1.1.0`

```yml
minify:
  js: true
  css: true
  html: true
```

## Hexo Related

[hexo-theme-MengD](https://github.com/lete114/hexo-theme-MengD)

[Hexo-SEO-AutoPush](https://github.com/lete114/hexo-seo-autopush)
