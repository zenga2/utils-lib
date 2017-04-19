// 将child节点插入到parent中，使其成为第n个子节点(从0开始计数)
function insertAt(parent, child, n) {
    let childNodes = parent.childNodes
    let len = childNodes.length

    if (n < 0 || n > len) {
        throw new Error("invalid index")
    } else if (n === len) {
        parent.appendChild(child)
    } else {
        parent.insertBefore(child, childNodes[n])
    }
}

// 查询窗口滚动条的位置
function getScrollOffset(w) {
    let htmlDom
    w = w || window

    // 支持>=IE9和其他浏览器
    if ("pageXOffset" in w) {
        return {x: w.pageXOffset, y: w.pageYOffset}
    }

    // 支持<=IE8的IE浏览器(只对标准模式进行支持，不考虑怪异模式)
    htmlDom = w.document.documentElement
    return {x: htmlDom.scrollLeft, y: htmlDom.scrollTop}
}

// 查询窗口的视口尺寸
function getViewportSize(w) {
    let htmlDom
    w = w || window

    // 支持>=IE9和其他浏览器
    if ("innerWidth" in w) {
        return {width: w.innerWidth, height: w.innerHeight}
    }

    // 支持<=IE8的IE浏览器(只对标准模式进行支持，不考虑怪异模式)
    htmlDom = w.document.documentElement
    return {width: htmlDom.clientWidth, height: htmlDom.clientHeight}
}

// 滚动浏览器到文档最下面的页面可见
function scrollToVisible() {
    // 文档的高度
    let documentHeight = document.documentElement.offsetHeight
    // 视口的高度
    let viewportHeight = getViewportSize().height

    // 滚动让最后一页可见
    window.scrollTo(0, documentHeight - viewportHeight)
}

// 获取元素e的文档坐标
// 窗口的滚动条的位置还等于document.documentElement.getBoundingClientRect()的left和top的绝对值
// 这个是视口坐标原点到文档坐标原点的偏移量(即窗口的滚动条的位置等于两坐标原点的偏移量)
function getElementPosition(el) {
    let rectObj = el.getBoundingClientRect()
    let scrollOffsetObj = getScrollOffset()
    return {
        left: rectObj.left + scrollOffsetObj.x,
        top: rectObj.top + scrollOffsetObj.y
    }
}

// 获取元素e的视口坐标
// 这个兼容较低版本浏览器(不支持getBoundingClientRect)
function getClientPosLV(el) {
    let left = 0
    let top = 0
    let e

    // 循环以累加偏移量
    for (e = el; !!e; e = e.offsetParent) {
        left += el.offsetLeft
        top += el.offsetTop
    }

    // 循环以减去滚动的偏移量
    // 这也减去了主滚动条，并转换为视口坐标
    for (e = el.parentNode; !!e && e.nodeType === 1; e = el.parentNode) {
        left -= e.scrollLeft
        top -= e.scrollTop
    }

    return {left: left, top: top}
}

export {insertAt, getScrollOffset, getViewportSize, scrollToVisible, getElementPosition, getClientPosLV}
