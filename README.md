# tailwind-toadbase

Open http://localhost:8080/dist/index.html


# CHANGE REQUESTS

## CR1@vue-template-loader

Input
```html
<svg class="w-10 h-10 fill-current text-white">
    <use href="~@svg/menu.svg#menu"></use>
</svg>
```

Patch vue-template-loader/lib/modules/template-compiler.js
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

Result
```js
_c('use',{attrs:{"href":__webpack_require__("./src/assets/svg/menu.svg") + "#menu"}})])
```

