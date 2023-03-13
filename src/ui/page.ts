import {div, span} from 'alins';

/*
 * @Author: chenzhongsheng
 * @Date: 2023-03-13 09:03:47
 * @Description: Coding something
 */
export function Page () {
    return div(
        '.box-page',
        span('.box-back', 'back'),
        span('.box-close', 'x'),
        div('.box-content')
    );
}