/*
 * @Author: tackchen
 * @Date: 2022-08-03 20:32:39
 * @Description: Coding something
 */

import {button, click} from 'alins';
import WebappBox from '../../src/index';


(window as any).wb = WebappBox;

let index = 0;
function createDiv () {
    const div = document.createElement('div');
    div.innerText = 'currentPageIndex = ' + (++index) + '; ';
    const button = document.createElement('button');
    button.innerText = 'addNewBox';
    button.onclick = () => {WebappBox.add(createDiv());};
    div.appendChild(button);
    return div;
}
function addNewBox () {
    index = 0;
    WebappBox.add(createDiv());
}

button('addNewBox', click(addNewBox)).mount();