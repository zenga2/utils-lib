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
function extend(targetObj, obj, isOverwrite) {
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

// 让fn2在fn1执行完后执行,
// 同时确保fn2的等待时间至少为minInterval
function executeAfter(fn1, fn2, minInterval) {
    minInterval = minInterval || 0;
    let isDone = false;
    let isTimeout = false;

    setTimeout(function () {
        // fn1已经执行完了
        if (isDone) {
            fn2()
        } else {
            isTimeout = true
        }

    }, minInterval)

    fn1(function () {
        if (isTimeout) {
            fn2()
        } else {
            isDone = true
        }
    })
}

function animation(workFn, duration) {
    let startTime = +(new Date);
    requestAnimationFrame(function step() {
        var currTime = +(new Date);
        workFn((currTime - startTime) / duration);
        if (currTime < duration) {
            requestAnimationFrame(step);
        }
    });
}

export {each, extend, bindTouchEvent, executeAfter,animation}
