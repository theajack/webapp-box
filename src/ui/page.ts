import {$, div, IComponentOptions, mounted} from 'alins';
import {style} from 'alins-style';

/*
 * @Author: chenzhongsheng
 * @Date: 2023-03-13 09:03:47
 * @Description: Coding something
 */

let Doms: HTMLElement[] = [];
export const ContentDoms: HTMLElement[] = [];

export function addPageDom (dom: HTMLElement, index: number) {
    Doms[index] = dom;
}

export function clearPageDom () {
    Doms = [];
}

export function Page ({props}: IComponentOptions) {
    return div(
        '.box-page',
        style({
            height: '100%',
            width: '100%',
            position: 'absolute',
            display: 'inline-block',
            left: $`${() => props.index.value * 100}%`
        }),
        div('.box-content',
            Doms[props.index.value] || null,
            mounted(dom => {
                console.log('dom', dom);
                ContentDoms[props.index.value] = dom;
            })
        )
    );
}