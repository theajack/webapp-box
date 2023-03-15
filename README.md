<!--
 * @Author: tackchen
 * @Date: 2022-08-03 21:24:33
 * @Description: Coding something
-->
## [webapp-box](https://github.com/theajack/webapp-box)

Web Application Container

[Online examples](https://theajack.github.io/jsbox?github=theajack.webapp-box)

## quickstart

```
npm i webapp-box
```

```js
import WebappBox from "webapp-box";

// add dom
let index = 0;
function createDiv() {
    let div = document.createElement('div');
    div.innerText = ++index;
    return div;
}

WebappBox.add(createDiv());
setTimeout(() => {
    WebappBox.add(createDiv()); // add another
}, 1000);

// return container
const container = await WebappBox.add();
```
