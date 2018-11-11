import {padLeft} from './stringUtils'

// fmt eg: 'yyyy-MM-dd hh:mm:ss'
function format(date, fmt) {
    let matchStr
    let obj = {
        '(M+)': date.getMonth() + 1,
        '(d+)': date.getDate(),
        '(h+)': date.getHours(),
        '(m+)': date.getMinutes(),
        '(s+)': date.getSeconds()
    }

    if (/(y+)/.test(fmt)) {
        matchStr = RegExp.$1
        fmt = fmt.replace(matchStr, String(date.getFullYear()).slice(4 - matchStr.length))
    }

    for (let k in obj) {
        if (new RegExp(k).test(fmt)) {
            matchStr = RegExp.$1
            let val = String(obj[k])
            // 当匹配模式中的M|d|h|m|s为单个的话，则相应的值左边不补零
            val = matchStr.length === 1 ? val : padLeft(val, '0', 2)
            fmt = fmt.replace(matchStr, val)
        }
    }

    return fmt
}

function modifyDate(date, opStr) {
    date = new Date(date)

    let arr = opStr.match(/^([-+]?\d+)([yMdhms])/)
    let propMap = {
        y: 'FullYear',
        M: 'Month',
        d: 'Date',
        h: 'Hours',
        m: 'Minutes',
        s: 'Seconds'
    }

    if (arr) {
        let num = Number(arr[1])
        let unitStr = arr[2]

        // modify date
        op(propMap[unitStr], num)
    }

    function op(prop, num) {
        date['set' + prop](date['get' + prop]() + num)
    }

    return date
}

export {format, modifyDate}
