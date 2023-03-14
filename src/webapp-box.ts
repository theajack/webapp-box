import {$, IReactWrap} from 'alins';
import {Box} from './ui/box';

/*
 * @Author: chenzhongsheng
 * @Date: 2023-03-13 08:58:53
 * @Description: Coding something
 */
export class WEBox {

    pages: IReactWrap<{
        title?: string;
    }>[];
    
    constructor () {
        this.pages = $([{title: ''}, {title: ''}]);
        Box(this.pages).mount();
    }

    add (title: string) {
        this.pages.push({title});
    }
    close () {

    }
    back () {
        
    }
}