/*
 * @Author: chenzhongsheng
 * @Date: 2023-03-19 16:02:56
 * @Description: Coding something
 */

export let Doms: HTMLElement[] = [];
export const ContentDoms: HTMLElement[] = [];

export function addPageDom (dom: HTMLElement, index: number) {
    Doms[index] = dom;
}

export function clearPageDom () {
    Doms = [];
}
