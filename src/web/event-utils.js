define(function (require, exports, module) {
    // 测试是否支持passive
    function isSupportPassive() {
        // Test via a getter in the options object to see
        // if the passive property is accessed
        var supportsPassive = false;
        try {
            var opts = Object.defineProperty({}, 'passive', {
                get: function () {
                    supportsPassive = true;
                }
            });
            window.addEventListener("test", null, opts);
        } catch (e) {
        }

        return supportsPassive;
    }

    function demo(el, fn) {
        // Use our detect's results.
        // passive applied if supported, capture will be false either way.
        el.addEventListener(
            'touchstart',
            fn,
            isSupportPassive() ? {passive: true} : false
        );
    }


    module.exports = {isSupportPassive: isSupportPassive}
})
