import {$, div, IComponentOptions, span} from 'alins';
import {style} from 'alins-style';

/*
 * @Author: chenzhongsheng
 * @Date: 2023-03-13 09:03:47
 * @Description: Coding something
 */
export function Page ({props}: IComponentOptions) {
    console.log(props);
    return div(
        '.box-page',
        style({
            height: '100%',
            width: '100%',
            position: 'absolute',
            display: 'inline-block',
            left: $`${() => props.index.value * 100}%`
        }),
        div('.box-content')
    );
}