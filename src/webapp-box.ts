
/*
 * @Author: chenzhongsheng
 * @Date: 2023-03-13 08:58:53
 * @Description: Coding something
 */

import {configBox, addPage, close, back} from './store/store';
import {Box} from './ui/box';
import version from './version';

let initialized = false;

export const WebappBox = {
    version,
    config: configBox,
    add (dom?: HTMLElement, title = '') {
        if (!initialized) {
            initialized = true;
            Box().mount();
        }
        addPage(dom, title);
    },
    close,
    back
};