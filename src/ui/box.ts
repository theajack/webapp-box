/*
 * @Author: chenzhongsheng
 * @Date: 2023-03-13 09:07:52
 * @Description: Coding something
 */

import {$, click, comp, div, IReactWrap, prop} from 'alins';
import {css, style} from 'alins-style';
import {Page} from './page';

function isMinScreen () {
    return window.innerWidth < 600;
}

css('.box-mask')(
    ['*', style.boxSizing('border-box')],
    ['.box-control',
        ['.box-back,.box-close',
            style(`
                width: 30px;
                height: 30px;
                margin: 5px;
                background-color: #fff5;
                border-radius: 5px;
                cursor: pointer;
                font-weight: bold;
                box-shadow: 0 0 20px rgba(0, 0, 0, .3);
            `),
        ],
        ['.box-back', style({
        })],
        ['.box-close', style({
        })],
    ],
    ['.box-content', style({
        height: '100%',
        overflowY: 'auto',
    })],
).mount();

export function Box ({
    back, close, pages, pageIndex, visible, show
}: {
    show: IReactWrap<boolean>,
    visible: IReactWrap<boolean>,
    pages: IReactWrap<{ title?: string;}>[],
    pageIndex: IReactWrap<number>,
    back: ()=>void,
    close: ()=>void,
}) {
    const isMin: IReactWrap<boolean> = $(isMinScreen());
    window.addEventListener('resize', () => {
        isMin.value = isMinScreen();
    });

    const containerStyle = style({
        position: 'absolute',
        width: () => isMin.value ? '100%' : '500px',
        height: () => isMin.value ? '80%' : '100%',
        right: 0,
        left: () => isMin.value ? 0 : 'auto',
        bottom: () => isMin.value ? 0 : 'auto',
        top: () => isMin.value ? 'auto' : 0,
        backgroundColor: '#fff',
        overflow: 'hidden',
        transform: $`translate${() => isMin.value ? 'Y' : 'X'}(${() => visible.value ? 0 : 100 }%)`,
        transition: 'transform .3s ease',
        boxShadow: '0 0 20px rgba(0, 0, 0, .3)'
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
            boxSizing: 'border-box',
            position: 'fixed',
            width: '100%',
            height: '100%',
            backgroundColor: '#0003',
            top: 0,
            left: 0,
            display: () => show.value ? 'block' : 'none',
            transition: 'opacity .3s ease',
            opacity: () => visible.value ? 1 : 0,
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
                fontSize: '18px',
                textAlign: 'center',
                right: () => isMin.value ? 0 : 500,
                bottom: () => isMin.value ? '80%' : 'auto',
            }),
            div('.box-back', click(back), style({
                position: () => isMin.value ? 'fixed' : 'relative',
                left: 0,
            }), '<'),
            div('.box-close', click(close), style.color('#e44'), '×'),
        ),
    );
}