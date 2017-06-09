import {each} from './utils'

function removeElement(el) {
    if (typeof el === 'string') {
        el = document.querySelector(el)
    }

    el.parentNode.removeChild(el)
}

function removeElements(els) {
    if (typeof els === 'string') {
        els = document.querySelectorAll(els)
    }

    Array.from(els).forEach(el => el.parentNode.removeChild(el))
}

// arg1: the element that want to created
// arg2: the container
// arg3: the attributes of new el
function createAndAppendEl(tag, parent, opts) {
    let el = document.createElement(tag)

    each(opts, function (attrVal, attrName) {
        el[attrName] = attrVal
    })

    return parent.appendChild(el)
}

export {removeElement, removeElements, createAndAppendEl}
