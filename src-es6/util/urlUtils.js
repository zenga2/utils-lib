// 将url中的查询参数解析成对象
function urlParse() {
    let url = window.location.search
    let obj = {}
    let reg = /[?&][^?&]+=[^?&]+/g
    let arr = url.match(reg)
    if (arr) {
        arr.forEach((item) => {
            let tempArr = item.slice(1).split('=')
            let key = decodeURIComponent(tempArr[0])
            obj[key] = decodeURIComponent((tempArr[1]))
        })
    }

    return obj
}

export {urlParse}
