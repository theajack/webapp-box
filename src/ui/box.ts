/*
 * @Author: chenzhongsheng
 * @Date: 2023-03-13 09:07:52
 * @Description: Coding something
 */

import {$, click, comp, div, IReactWrap, prop} from 'alins';
import {css, style} from 'alins-style';
import {back, getStore, close} from '../store/store';
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
                transition: background-color .3s ease;
            `),
        ],
        ['.box-back:hover,.box-close:hover',
            style(`
                background-color: #ffff;
            `),
        ],
    ],
    ['.box-content',
        style({
            height: '100%',
            overflowY: 'auto',
        }),
        [ '&::-webkit-scrollbar', style({
            width: 5,
            cursor: 'pointer',
            height: 5,
        }) ],
        [ '&::-webkit-scrollbar-button', style({
            display: 'none',
        }) ],
        [ '&::-webkit-scrollbar-track', style({
            display: 'none',
        }) ],
        [ '&::-webkit-scrollbar-thumb', style({
            backgroundColor: 'hsla(0,0%,53.3%,.4)',
            cursor: 'pointer'
        }) ],
        [ '&::-webkit-scrollbar-track-piece', style({
            backgroundColor: 'hsla(0,0%,53.3%,.06666666666666667)'
        }) ]
    ],
).mount();

export function Box () {
    const {
        pageIndex, show, visible, pages, clickMaskClose,
        width, height,
    } = getStore();
    const isMin: IReactWrap<boolean> = $(isMinScreen());
    window.addEventListener('resize', () => {
        isMin.value = isMinScreen();
    });

    const containerStyle = style({
        position: 'absolute',
        width: () => isMin.value ? '100%' : width.value,
        height: () => isMin.value ? height.value : '100%',
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

    return div('.box-mask',
        click(() => {
            if (clickMaskClose.value) close();
        }),
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
            zIndex: 10000,
        }),
        div('.box-container',
            click.stop,
            containerStyle,
            div('.box-bar',
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
            click.stop,
            style({
                position: 'absolute',
                fontSize: 25,
                lineHeight: 25,
                textAlign: 'center',
                userSelect: 'none',
                right: () => isMin.value ? 0 : width.value,
                bottom: () => isMin.value ? height.value : 'auto',
            }),
            div.show(() => pages.length > 1)('.box-back', click(back), style({
                position: () => isMin.value ? 'fixed' : 'relative',
                left: 0,
                color: '#333',
            }), '<'),
            div('.box-close', click(close), style.color('#d00'), '×'),
        ),
    );
}