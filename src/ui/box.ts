/*
 * @Author: chenzhongsheng
 * @Date: 2023-03-13 09:07:52
 * @Description: Coding something
 */

import {$, comp, div, IReactWrap} from 'alins';
import {style} from 'alins-style';
import {Page} from './page';

function isMinScreen () {
    return window.innerWidth < 600;
}

export function Box (pages: IReactWrap<{
    title?: string;
}>[]) {
    

    const isMin: IReactWrap<boolean> = $(isMinScreen() );

    window.addEventListener('resize', () => {
        isMin.value = isMinScreen();
    });

    // const barStyle = style({
    //     transform
    // });

    const containerStyle = style({
        position: 'absolute',
        width: $`${() => isMin.value ? '100%' : '500px' }`,
        height: $`${() => isMin.value ? '80%' : '100%' }`,
        right: 0,
        left: $`${() => isMin.value ? 0 : 'auto'}`,
        bottom: $`${() => isMin.value ? 0 : 'auto'}`,
        top: $`${() => isMin.value ? 'auto' : 0}`,
        backgroundColor: '#fff',
    });

    return div(
        '.box-mask',
        style({
            position: 'fixed',
            width: '100%',
            height: '100%',
            backgroundColor: '#0003',
            top: 0,
            left: 0,
        }),
        div(
            '.box-bar',
            div(
                '.box-container',
                containerStyle,
                comp(Page).for(pages)(() => []),
            )
        ),
    );
}