define(function (require, exports, module) {
    var utils = require('./utils/utils');

    function createClass(constructor, instanceProps, staticPros) {
        function classItem() {
            if (typeof constructor === 'function') {
                constructor.apply(this, arguments);
            }

            utils.extendObj(classItem.prototype, instanceProps);

            utils.extendObj(classItem, staticPros);
        }
    }

    module.exports = {createClass: createClass};
})