import {each} from './utils'
import {firstLetterToUpperCase} from './stringUtils'

// 给元素设置内联样式
function setCss(el, styleObj) {
    if (!el) {
        throw new Error('invalid argument: el cannot be empty')
    } else if (typeof el === 'string') {
        el = document.querySelector(el)
    }

    let bodyStyleObj = document.body.style;

    each(styleObj, function (val, prop) {
        // 判断是否需要加前缀(这里针对的是移动端，所以只考虑webkit)
        let wProp = 'webkit' + firstLetterToUpperCase(prop)

        if (!(prop in bodyStyleObj) && (wProp in bodyStyleObj)) {
            prop = wProp
        }

        el.style[prop] = val
    })
}

export {setCss}