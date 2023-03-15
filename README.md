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
import { WebappBox } from "webapp-box";

const box = new WebappBox();

// add dom
let index = 0;
function createDiv() {
    let div = document.createElement('div');
    div.innerText = ++index;
    return div
}

box.add(createDiv());
setTimeout(() => {
    box.add(createDiv()); // add another
}, 1000);

// return container
const container = await box.add();
```
