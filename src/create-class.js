define(function (require, exports, module) {
    var utils = require('./utils/utils');

    function createClass(constructor, instanceProps, staticPros) {
        function ClassItem() {
            if (typeof constructor === 'function') {
                constructor.apply(this, arguments);
            }
        }

        // 静态属性
        utils.extend(ClassItem, staticPros);
        // 实例属性
        utils.extend(ClassItem.prototype, instanceProps);

        return ClassItem;
    }

    module.exports = {createClass: createClass};
})