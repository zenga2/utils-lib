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
function extend(target, source, isOverwrite) {
    isOverwrite = isOverwrite || true
    let keys = Object.keys(source)
    let len = keys.length

    if (isOverwrite) {
        for (let i = 0; i < len; i++) {
            let key = keys[i]
            target[key] = source[key]
        }
    } else {
        for (let i = 0; i < len; i++) {
            let key = keys[i]
            if (!(key in target)) {
                target[key] = source[key]
            }
        }
    }

    return target
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
    minInterval = minInterval || 0
    let isDone = false
    let isTimeout = false

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
    let startTime = +(new Date())
    requestAnimationFrame(function step() {
        let currTime = +(new Date())
        let ratio = (currTime - startTime) / duration
        workFn(ratio)
        if (ratio <= 1) {
            requestAnimationFrame(step)
        }
    })
}

// 设置函数两次运行之间的间隔
// 例如500ms内函数只能运行一次
function throttle(fn, interval) {
    let lastTime = +new Date()

    return function () {
        let currTime = +new Date()
        if (currTime - lastTime > interval) {
            fn.apply(null, arguments)
        }
        lastTime = currTime
    }
}

function runDelay(fn, interval) {
    let timeoutId
    let handle = function () {
        fn.apply(null, arguments)
    }

    return function () {
        // clear last timeout
        window.clearTimeout(timeoutId)
        // reset timeout
        timeoutId = setTimeout(handle, interval)
    }
}

function findOverflow() {
    setTimeout(function () {
        traverseDom(document.body, function (node) {
            let parentNode = node.parentNode
            if (parentNode && parentNode.getBoundingClientRect && node.getBoundingClientRect) {
                let pRect = parentNode.getBoundingClientRect()
                let childRect = node.getBoundingClientRect()

                if (childRect.width > pRect.width) {
                    console.log('overflowX', parentNode, pRect, node, childRect)
                }

                if (childRect.height > pRect.height) {
                    console.log('overflowY', parentNode, pRect, node, childRect)
                }
            }
        })
    }, 2000)

    function traverseDom(node, func) {
        func(node)
        node = node.firstChild
        while (node) {
            traverseDom(node, func)
            node = node.nextSibling
        }
    }
}

class CustomError extends Error {
    constructor(name, message) {
        super()
        Object.assign(this, {name, message})
    }
}

function downloadFile(url, filename) {
    let el = document.createElement('a')
    el.href = url
    if (filename) {
        el.download = filename
    }
    el.click()
}

export {
    each,
    extend,
    bindTouchEvent,
    executeAfter,
    animation,
    throttle,
    runDelay,
    findOverflow,
    CustomError,
    downloadFile
}
