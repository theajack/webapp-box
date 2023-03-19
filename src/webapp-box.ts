import {$, IReactWrap, value} from 'alins';
import {Box} from './ui/box';
import {addPageDom, clearPageDom, ContentDoms} from './ui/page';
import version from './version';

/*
 * @Author: chenzhongsheng
 * @Date: 2023-03-13 08:58:53
 * @Description: Coding something
 */
export class WebappBox {

    static instance: WebappBox;

    version = version;

    private _pages: IReactWrap<{
        title?: string;
    }>[] = $([]);

    private _pageIndex: IReactWrap<number> = $(0);
    private _visible: IReactWrap<boolean> = $(false);
    private _show: IReactWrap<boolean> = $(false);
    
    constructor () {
        if (WebappBox.instance) return WebappBox.instance;
        Box({
            show: this._show,
            visible: this._visible,
            pages: this._pages,
            pageIndex: this._pageIndex,
            back: () => {this.back();},
            close: () => {this.close();}
        }).mount();
        WebappBox.instance = this;
    }

    private _setShow (bool = true) {
        if (bool) {
            this._show.value = bool;
            setTimeout(() => {this._visible.value = bool;}, 10);
        } else {
            this._visible.value = bool;
            setTimeout(() => {this._show.value = bool;}, 300);
        }
    }
    

    async add (dom?: HTMLElement, title = '') {
        if (!this._visible.value) {
            this._setShow();
        }
        const index = this._pages.length;
        if (dom) addPageDom(dom, index);
        this._pages.push({title});

        return new Promise<HTMLElement>(resolve => {
            setTimeout(() => {
                this._pageIndex.value = index;
                resolve(ContentDoms[index]);
            }, 0);
        });
    }
    close () {
        this._setShow(false);
        this._pages[value] = [];
        clearPageDom();
    }
    back () {
        if (this._pageIndex.value === 0) {
            this.close();
        } else {
            this._pageIndex.value --;
            setTimeout(() => {
                this._pages.splice(this._pages.length - 1, 1);
            }, 300);
        }
    }
}