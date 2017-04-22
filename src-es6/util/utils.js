import {isArray} from './typeUtils'

function each(obj, fn) {
    if (!obj || !fn) return

    if (isArray(obj)) {
        for (let i = 0, len = obj.length; i < len; i++) {
            if (fn.call(obj, obj[i], i) === false) return
        }
    } else {
        let keys = Object.keys(obj)
        for (let i = 0, len = keys.length; i < len; i++) {
            let k = keys[i]
            if (fn.call(obj, obj[k], k) === false) return
        }
    }
}

// 扩展对象
function extendObj(targetObj, obj, isOverwrite) {
    isOverwrite = isOverwrite || true
    let keys = Object.keys(obj)
    let len = keys.length

    if (isOverwrite) {
        for (let i = 0; i < len; i++) {
            let key = keys[i]
            targetObj[key] = obj[key]
        }
    } else {
        for (let i = 0; i < len; i++) {
            let key = keys[i]
            if (!(key in targetObj)) {
                targetObj[key] = obj[key]
            }
        }
    }

    return targetObj
}

function bindTouchEvent(option) {
    let el = option.el
    if (!el) {
        throw new Error('Invalid argument: el(property) cannot be empty')
    } else if (typeof el === 'string') {
        el = document.querySelector(el)
    }

    let typeArr = ['touchstart', 'touchmove', 'touchend']
    typeArr.forEach(function (eventType) {
        el.addEventListener(eventType, option[eventType])
    })
}

export {each, extendObj, bindTouchEvent}
