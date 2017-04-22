define(function (require, exports, module) {
    var isArray = require('./typeUtils').isArray;

    function each(obj, fn) {
        if (!obj || !fn) return;
        var i;
        var len;
        var keys;

        if (isArray(obj)) {
            for (i = 0, len = obj.length; i < len; i++) {
                if (fn.call(obj, obj[i], i) === false) return;
            }
        } else {
            keys = Object.keys(obj);
            for (i = 0, len = keys.length; i < len; i++) {
                var k = keys[i];
                if (fn.call(obj, obj[k], k) === false) return;
            }
        }
    }

    // 扩展对象
    function extendObj(targetObj, obj, isOverwrite) {
        isOverwrite = isOverwrite || true;
        var keys = Object.keys(obj);
        var len = keys.length;
        var key;
        var i;

        if (isOverwrite) {
            for (i = 0; i < len; i++) {
                key = keys[i];
                targetObj[key] = obj[key];
            }
        } else {
            for (i = 0; i < len; i++) {
                key = keys[i];
                if (!(key in targetObj)) {
                    targetObj[key] = obj[key];
                }
            }
        }

        return targetObj;
    }

    function bindTouchEvent(option) {
        var el = option.el;
        if (!el) {
            throw new Error('Invalid argument: el(property) cannot be empty');
        } else if (typeof el === 'string') {
            el = document.querySelector(el);
        }

        var typeArr = ['touchstart', 'touchmove', 'touchend'];
        typeArr.forEach(function (eventType) {
            el.addEventListener(eventType, option[eventType]);
        })
    }

    // 让fn2在fn1执行完后执行,可以给fn1的执行时间设置一个最小时间间隔
    function executeAfter(fn1, fn2, minInterval) {
        minInterval = minInterval || 0;
        var isDone = false;
        var isTimeout = false;

        setTimeout(function () {
            // fn1已经执行完了
            if (isDone) {
                fn2();
            } else {
                isTimeout = true;
            }

        }, minInterval);

        fn1(function () {
            if (isTimeout) {
                fn2();
            } else {
                isDone = true;
            }
        })
    }

    module.exports = {
        each: each,
        extendObj: extendObj,
        bindTouchEvent: bindTouchEvent,
        executeAfter: executeAfter
    }
})




