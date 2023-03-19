/*
 * @Author: chenzhongsheng
 * @Date: 2023-03-19 15:34:59
 * @Description: Coding something
 */
import {$, value} from 'alins';
import {addPageDom, clearPageDom, ContentDoms} from '../store/dom';

export interface IWebappBoxConfig {
    clickMaskClose?: boolean;
    width?: number;
    height?: number;
}

const store = {
    pageIndex: $(0),
    visible: $(false),
    show: $(false),
    width: $('500px'),
    height: $('80%'),
    clickMaskClose: $(false),
    pages: $([] as {
        title?: string;
    }[])
};

export function getStore () {
    return store;
}

export function addPage (dom?: HTMLElement, title = '') {

    if (!store.visible.value) {
        setShow();
    }
    const index = store.pages.length;
    if (dom) addPageDom(dom, index);
    store.pages.push({title});

    return new Promise<HTMLElement>(resolve => {
        setTimeout(() => {
            store.pageIndex.value = index;
            resolve(ContentDoms[index]);
        }, 0);
    });
}

export function setShow (bool = true) {
    if (bool) {
        store.show.value = bool;
        setTimeout(() => {store.visible.value = bool;}, 10);
    } else {
        store.visible.value = bool;
        setTimeout(() => {store.show.value = bool;}, 300);
    }
}

export function configBox ({
    clickMaskClose, width, height
}: IWebappBoxConfig) {
    if (typeof clickMaskClose === 'boolean')
        store.clickMaskClose.value = clickMaskClose;
    
    if (typeof width === 'number') {
        store.width.value = formatSize(width);
    }
    if (typeof height === 'number') {
        store.height.value = formatSize(height);
    }
}

function formatSize (size: number) {
    return size <= 1 ? `${size * 100}%` : `${size}px`;
}

export function back () {
    if (store.pageIndex.value === 0) {
        close();
    } else {
        store.pageIndex.value --;
        setTimeout(() => {
            store.pages.splice(store.pages.length - 1, 1);
        }, 300);
    }
}

export function close () {
    if (!store.show.value) return;
    setShow(false);
    store.pages[value] = [];
    clearPageDom();
}