import {each} from './utils'

// 给元素设置内联样式
// todo 考虑前缀的情况
function setCss(el, styleObj) {
    if (!el) {
        throw new Error('invalid argument: el cannot be empty')
    } else if (typeof el === 'string') {
        el = document.querySelector(el)
    }

    var bodyStyleObj = document.body.style;

    each(styleObj, function (val, prop) {
        // 判断是否需要加前缀(这里针对的是移动端，所以只考虑webkit)
        var wProp = 'webkit' + firstLetterToUpperCase(prop)

        if (!(prop in bodyStyleObj) && (wProp in bodyStyleObj)) {
            prop = wProp
        }

        el.style[prop] = val
    })
}