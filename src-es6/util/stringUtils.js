function padLeft(str, padStr, totalLen) {
    while (str.length < totalLen) {
        str = padStr + str
    }

    return str.slice(-totalLen)
}

function padRight(str, padStr, totalLen) {
    while (str.length < totalLen) {
        str += padStr
    }

    return str.slice(0, totalLen)
}

export {padLeft, padRight}