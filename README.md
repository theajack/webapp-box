<!--
 * @Author: tackchen
 * @Date: 2022-08-03 21:24:33
 * @Description: Coding something
-->
## [webapp-box](https://github.com/theajack/webapp-box)

Web Application Container

[Online examples](https://theajack.github.io/jsbox?github=theajack.webapp-box) | [Version Log](https://github.com/theajack/webapp-box/blob/master/scripts/version.md)

## quickstart

```
npm i webapp-box
```

```js
import WebappBox from "webapp-box";

let index = 0;
function createDiv() {
    let div = document.createElement('div');
    div.innerText = ++index;
    return div;
}

// add dom
WebappBox.add(createDiv());
setTimeout(() => {
    WebappBox.add(createDiv()); // add another
}, 1000);

// return container
const container = await WebappBox.add();
container.appendChild(createDiv());
```

## config

```js
WebappBox.config({
    width: 600, // Set box container width
    height: 0.5, // Set box container height
    clickMaskClose: true, // 
})
```

When setting the width or height, greater than 1 indicates px and less than 1 indicates a percentage
