import {each} from './utils'

// 给元素增加内联样式
function insertStyle(el, styleObj) {
    if (!el) {
        throw new Error('invalid argument: el cannot be empty')
    } else if (typeof el === 'string') {
        el = document.querySelector(el)
    }

    each(styleObj, function (val, prop) {
        el.style[prop] = val
    })
}