# tailwind-toadbase

Open http://localhost:8080/dist/index.html


# CHANGE REQUESTS

## ktsn/vue-template-loader#49 feat: Support uri fragment in transformed require

Input
```html
<svg class="w-10 h-10 fill-current text-white">
    <use href="~@svg/menu.svg#menu"></use>
</svg>
```

Patch main vue-template-loader/lib/modules/template-compiler.js
```js
...
const url = require('url')
const loaderUtils = require('loader-utils')
...
function rewriteAsset (attr) {
  let value = attr.value

  const isStatic = value[0] === '"'
    && value[value.length - 1] === '"'
  if (!isStatic) {
    return
  }

  const first = value[1]
  if (first === '.' || first === '~') {
    if (first === '~') {
      value = '"' + value.slice(2)
    }
    const fullUrl = value.length > 2 ? value.slice(1, value.length - 1) : null; //
    var urlWithoutHash = null;
    var theHash = null;
    if(loaderUtils.isUrlRequest(fullUrl)){
      const uri = url.parse(fullUrl);
      if(uri.hash != null && uri.hash != undefined){
        theHash = uri.hash;
        urlWithoutHash = uri.path
      }
    }
    attr.value = theHash == null ? `require(${value})` : `require("${urlWithoutHash}") + "${theHash}"`
  }
}
```

Patch test
/home/joma/entwicklung/nodews/vue-template-loader/test/modules/template-compiler.spec.js

```js
const SourceMapConsumer = require('source-map').SourceMapConsumer
const compile = require('../../lib/modules/template-compiler')

describe('template-compiler', () => {
  it('transforms specified el\'s attr to require', () => {
    const actual = compile('<img src="./foo.png">', {
      transformToRequire: {
        img: 'src'
      }
    })
    expect(actual.code).toMatch(/require\("\.\/foo\.png"\)/)
  })

  it('does not transform unspecified attributes', () => {
    const actual = compile('<img src="./foo.png">')
    expect(actual.code).toMatch(/"src":"\.\/foo\.png"/)
  })

  it('transforms "~" to module name require', () => {
    const actual = compile('<img src="~foo.png">', {
      transformToRequire: {
        img: 'src'
      }
    })
    expect(actual.code).toMatch(/require\("foo\.png"\)/)
  })

  it('generates source map', () => {
    const src = '<p>Hello</p>'
    const actual = compile(src, {
      sourceMap: true,
      fileName: 'test.html'
    })
    expect(actual.map).toBeTruthy()

    const smc = new SourceMapConsumer(actual.map)
    const pos = smc.originalPositionFor({ line: 1, column: actual.code.length })
    expect(pos.line).toBe(1)
    expect(pos.column).toBe(0)
  })

  /**
   * ktsn/vue-template-loader#41 Support uri fragment in transformed require
   */
  it('supports uri fragment in transformed require', () => {
    const src = //
    '<svg>\
      <use href="~@svg/file.svg#fragment"></use>\
    </svg>'
    const actual = compile(src, {
      transformToRequire: {
        use: 'href'
      }
    })
    expect(actual.code).toMatch(/"href":require\("@svg\/file.svg"\) \+ "#fragment"/)
  })

  /**
   * ktsn/vue-template-loader#41 Support uri fragment in transformed require
   */
  it('when too short uri then empty require', () => {
    const src = //
    '<svg>\
      <use href="~"></use>\
    </svg>'
    const actual = compile(src, {
      transformToRequire: {
        use: 'href'
      }
    })
    expect(actual.code).toMatch(/"href":require\(""\)/)
  })
})
```

Expected Result
```js
_c('use',{attrs:{"href":__webpack_require__("./src/assets/svg/menu.svg") + "#menu"}})])
```

