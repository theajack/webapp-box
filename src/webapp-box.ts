import {$, IReactWrap, value} from 'alins';
import {Box} from './ui/box';
import {addPageDom, clearPageDom, ContentDoms} from './ui/page';

/*
 * @Author: chenzhongsheng
 * @Date: 2023-03-13 08:58:53
 * @Description: Coding something
 */
export class WEBox {

    pages: IReactWrap<{
        title?: string;
    }>[] = $([]);

    index = 0;

    pageIndex: IReactWrap<number> = $(0);
    visible: IReactWrap<boolean> = $(false);
    show: IReactWrap<boolean> = $(false);
    
    constructor () {
        Box({
            show: this.show,
            visible: this.visible,
            pages: this.pages,
            pageIndex: this.pageIndex,
            back: () => {this.back();},
            close: () => {this.close();}
        }).mount();
    }

    private _setShow (bool = true) {
        if (bool) {
            this.show.value = bool;
            setTimeout(() => {this.visible.value = bool;}, 10);
        } else {
            this.visible.value = bool;
            setTimeout(() => {this.show.value = bool;}, 300);
        }
    }
    

    async add (dom?: HTMLElement, title = '') {
        if (!this.visible.value) {
            this._setShow();
        }
        const index = this.pages.length;
        if (dom) addPageDom(dom, index);
        this.pages.push({title});

        return new Promise<HTMLElement>(resolve => {
            setTimeout(() => {
                this.pageIndex.value = index;
                resolve(ContentDoms[index]);
            }, 0);
        });
    }
    close () {
        this._setShow(false);
        this.pages[value] = [];
        clearPageDom();
    }
    back () {
        if (this.pageIndex.value === 0) {
            this.close();
        } else {
            this.pageIndex.value --;
        }
    }
}