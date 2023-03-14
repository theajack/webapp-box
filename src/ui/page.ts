import {div, span} from 'alins';
import {style} from 'alins-style';

/*
 * @Author: chenzhongsheng
 * @Date: 2023-03-13 09:03:47
 * @Description: Coding something
 */
export function Page () {
    return div(
        '.box-page',
        style({
            height: '50%',
            width: '60%',
            border: '1px solid #aaa',
        }),
        span('.box-back', 'back'),
        span('.box-close', 'x'),
        div('.box-content')
    );
}