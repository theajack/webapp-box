/*
 * @Author: chenzhongsheng
 * @Date: 2023-03-13 09:07:52
 * @Description: Coding something
 */

import {$, comp, div, IReactWrap, prop} from 'alins';
import {css, style} from 'alins-style';
import {Page} from './page';

function isMinScreen () {
    return window.innerWidth < 600;
}

css('.box-mask')(
    style.boxSizing('border-box'),
    ['*', style.boxSizing('border-box')],
    ['.box-control',
        ['.box-back,.box-close', style({
            // position: 'absolute',
            // fontSize: 25,
            // color: '#000',
            // fontWeight: 'bold',
            // cursor: 'pointer',
        })],
        ['.box-back', style({
        })],
        ['.box-close', style({
        })],
    ],
    ['.box-content', style({
        height: '100%',
        overflowY: 'auto',
    })]
).mount();

export function Box (pages: IReactWrap<{
    title?: string;
}>[]) {
    

    const isMin: IReactWrap<boolean> = $(isMinScreen());
    const pageIndex: IReactWrap<number> = $(0);
    (window as any).pi = pageIndex;

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
        overflow: 'hidden',
    });

    const barStyle = style({
        width: '100%',
        height: '100%',
        transform: $`translateX(${() => pageIndex.value * (-100)}%)`,
        transition: 'transform .3s ease',
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
            '.box-container',
            containerStyle,
            div(
                '.box-bar',
                barStyle,
                comp(Page).for(pages)((item, index) => [
                    prop({
                        ...(item as any),
                        index
                    })
                ]),
            ),
        ),
        div('.box-control',
            style({
                position: 'absolute',
                backgroundColor: '#fff',
                width: '50px',
                fontSize: '18px',
                textAlign: 'center',
                right: 500,
            }),
            div('.box-back', '<'),
            div('.box-close', '×'),
        ),
    );
}